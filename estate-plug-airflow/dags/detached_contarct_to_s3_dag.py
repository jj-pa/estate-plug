from airflow.models import DAG
from airflow.utils.dates import days_ago
from airflow.operators.python_operator import PythonOperator
from airflow.models import Variable
import time
from pprint import pprint
from datetime import datetime
import logging
import numpy as np
import pandas as pd
import boto3
from datetime import date
from dateutil.relativedelta import relativedelta
from sqlalchemy import create_engine
from urllib.request import urlopen, Request
from bs4 import BeautifulSoup
from io import StringIO
from pykafka import KafkaClient


args = {'owner': 'jeongjin',
        'start_date': datetime(2020,9,6)}

dag = DAG(dag_id='detached_contract_to_s3_dag',
          default_args=args,
          schedule_interval='@once')


def print_variables(input_year, input_month, **kwargs):
    pprint(input_year)
    logging.info(input_year)
    pprint(input_month)
    logging.info(input_month)


def per_delta(start, end, delta):
    curr = start
    while curr < end:
        yield curr
        curr += delta

def get_contract_frame(service_key, lawd_cd, deal_ymd):
    url = 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcSHRent' \
          '?ServiceKey=' + service_key + '&LAWD_CD=' + lawd_cd + '&DEAL_YMD=' + deal_ymd
    request = Request(url)
    request.get_method = lambda: 'GET'
    response_body = urlopen(request).read()
    soup = BeautifulSoup(response_body, 'lxml-xml')
    items = soup.findAll('item')

    contract_frame = pd.DataFrame()
    for row in items:
        item = {}
        for data in row:
            item[data.name] = data.text.strip()
        item['계약일'] = int(item['년']) * 10000 + int(item['월']) * 100 + int(item['일'])
        item['보증금액'] = int(item['보증금액'].replace(',', ''))
        item['월세금액'] = int(item['월세금액'].replace(',', ''))
        item['계약면적'] = float(item['계약면적'])

        contract_row = pd.Series(item)
        contract_frame = contract_frame.append(contract_row, ignore_index=True)
    return contract_frame


def task_detached_contract_data(input_year, input_month, **kwargs):
    export_file_path = './export/'
    export_file_name = 'detached_contract_'
    api_key = 'wwUINTtvcd3Q%2BJn7o%2BPHDn9Lt1%2BlGS7VRpJYF%2BEyRI0DNgv%2FXsK9gKNR0re6sQEnZzqhs5s2%2FKqH0TZOAcRRmw%3D%3D'
    encode_set = 'utf-8'
    api_count = 1
    bucket = 'store-estate'
    csv_buffer = StringIO()
    s3_resource = boto3.resource('s3')

    # kafka
    # kafka_client = KafkaClient(hosts='52.79.55.128:9092')
    # kafka_topic = kafka_client.topics['apart-contract']
    # kafka_producer = kafka_topic.get_sync_producer()

    # pandas console options
    desired_width = 1000
    pd.set_option('display.max_rows', 200)
    pd.set_option('display.max_columns', 500)
    pd.set_option('display.width', desired_width)
    np.set_printoptions(linewidth=desired_width)

    # sqlalchemy connection & code data
    engine = create_engine('mysql+pymysql://root:P@ssw0rd@52.79.55.128:63306/estate')
    conn = engine.connect()
    code_frame = pd.read_sql_table('TB_CODE_ADDRESS', conn)
    code_frame['LAWD_CD'] = code_frame['code'].astype(str).str.slice(0, 5)

    # Specific lawd_cd
    lawd_list = code_frame['LAWD_CD'].unique()
    lawd_list.sort()
    print(lawd_list)
    print('지역코드 카운팅: ' + str(lawd_list.size));

    # Create date parameters
    year_month_data = list()
    for result in per_delta(date(year=int(input_year), month=int(input_month), day=1),
                            date(year=int(input_year), month=int(input_month), day=28),
                            relativedelta(months=1)):
        year_month_data.append(result.strftime("%Y%m"))
    print(year_month_data)

    # Call api
    count = 0
    total_count = 0
    while count < api_count:
        for lawd_cd in lawd_list:
            for deal_ymd in year_month_data:
                print('(' + str(count + 1) + ')' + str(deal_ymd) + ': ' + str(lawd_cd))
                contract_df_by_api = get_contract_frame(api_key, lawd_cd, deal_ymd)
                print(contract_df_by_api.tail())
                # save file
                is_header = count == 0 and True or None
                contract_df_by_api.to_csv(export_file_path + export_file_name + str(deal_ymd) + '.csv', header=is_header,
                                       index=False, encoding=encode_set, mode='a')
                total_count += 1
                print('total count: ' + str(total_count))
        count += 1

    # upload s3
    for deal_ymd in year_month_data:
        contract_df_by_api = pd.read_csv(export_file_path + export_file_name + str(deal_ymd) + '.csv')
        contract_df_by_api.to_csv(csv_buffer)
        s3_resource.Object(bucket, export_file_name + str(deal_ymd) + '.csv').put(Body=csv_buffer.getvalue())

    # send kafka broker
    # kafka_producer.produce(contract_df_by_api.to_json(orient='index'))
    # response에 담겨있는 Buckets의 이름만 가져와 buckets 변수에 배열로 저장.


t1 = PythonOperator(task_id='task_1',
                    provide_context=True,
                    python_callable=print_variables,
                    op_kwargs={'input_year': Variable.get("arg_year"),
                               'input_month': Variable.get("arg_month")},
                    dag=dag)

t2 = PythonOperator(task_id='task_2',
                    provide_context=True,
                    python_callable=task_detached_contract_data,
                    op_kwargs={'input_year': Variable.get("arg_year"),
                               'input_month': Variable.get("arg_month")},
                    dag=dag)

t1 >> t2