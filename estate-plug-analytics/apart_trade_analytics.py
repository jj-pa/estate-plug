import pandas as pd
import json
from datetime import date
from dateutil.relativedelta import relativedelta
from io import StringIO # Python 3.x
from mongodb import connect_mongo, insert_apart_trade_targetarea_increase
from s3 import get_s3_client, print_buckets, print_bucket_files
from util import count_trade, read_trade, target_area_trade_increase_decrease, per_delta
#%%
client = get_s3_client()
#%%
print_buckets(client)
#%%
print_bucket_files(client, 'store-estate')
#%%
# 15년 전월 대비 거래량 차이
client = get_s3_client()
# 날짜 변수 생성
year_month_data = list()
start_year = 2015
start_month = 1
end_year = 2015
end_month = 12
# 날짜 범위만큼 아파트 매매 데이터 로드
df_trade_count_arr = list()
for result in per_delta(date(year=int(start_year), month=int(start_month), day=1),
                        date(year=int(end_year), month=int(end_month), day=28),
                        relativedelta(months=1)):
    year_month_data.append(result.strftime("%Y%m")) # 날짜 배열에 저장
    df_trade = read_trade(_s3Obj=client, _item="apart", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade_count = count_trade(df_trade)
    df_trade_count_arr.append(df_trade_count)

# 전월 대비 거래량 차이 저장
diff_prev_month = list()
result_df = pd.DataFrame(columns=['area_code', 'year_month', 'value'])
for idx, item in enumerate(df_trade_count_arr):
    # 처음 루틴에서는 처음 월을 위해 0 값 설정 데이터 생성
    if idx == 0:
        init_df = df_trade_count_arr[idx + 1] - df_trade_count_arr[idx]
        init_df['year_month'] = year_month_data[0]  # 초기 날짜 데이터 추가 (201501)
        init_df['area_code'] = init_df.index  # 지역코드 컬럼 추가 (인덱스)
        init_df.reset_index(level=0, inplace=True, drop=True)  # 인덱스 초기화
        init_df.rename(columns={'지역코드': 'value'}, inplace=True)  # 값 컬럼명 변경
        init_df['value'] = 0  # 초기값 0으로 설정
        init_df = init_df[['area_code', 'year_month', 'value']].sort_values(by=['area_code'], axis=0)  # 컬럼 순서 변경
        result_df = pd.concat([result_df, init_df], ignore_index=True)
    # 결과 데이터프레임에 전월 대비 프레임 병합
    if idx < len(df_trade_count_arr) - 1:
        diff_df = df_trade_count_arr[idx + 1] - df_trade_count_arr[idx]
        diff_df['year_month'] = year_month_data[idx + 1] # 날짜 데이터 추가
        diff_df['area_code'] = diff_df.index # 지역코드 컬럼 추가 (인덱스)
        diff_df.reset_index(level=0, inplace=True, drop=True) # 인덱스 초기화
        diff_df.rename(columns={'지역코드': 'value'}, inplace=True) # 값 컬럼명 변경
        diff_df = diff_df[['area_code', 'year_month', 'value']].sort_values(by=['area_code'], axis=0) # 컬럼 순서 변경
        result_df = pd.concat([result_df, diff_df], ignore_index=True)

print(result_df)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["apart_trade_monthly_increase_decrease"]
collection.insert_many(result_df.to_dict('records'))

#%%
# 15년 지역별 월 평균 거래 금액
client = get_s3_client()
# 날짜 변수 생성
year_month_data = list()
start_year = 2015
start_month = 1
end_year = 2015
end_month = 12
# 날짜 범위만큼 아파트 매매 데이터 로드
result_df = pd.DataFrame(columns=['area_code', 'price'])
for result in per_delta(date(year=int(start_year), month=int(start_month), day=1),
                        date(year=int(end_year), month=int(end_month), day=28),
                        relativedelta(months=1)):
    df_trade = read_trade(_s3Obj=client, _item="apart", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade.drop(columns=['지번', '층', '년', '월', '일', '아파트', '법정동', '매매일', '건축년도', '전용면적'], inplace=True)
    df_trade.rename(columns={'거래금액': 'price', '지역코드': 'area_code'}, inplace=True)  # 값 컬럼명 변경
    # df_trade['year_month'] = result.strftime("%Y%m")  # 날짜 데이터 추가
    df_trade = df_trade[df_trade['price'].astype(str) != '거래금액'].astype(float)
    df_trade.astype({"area_code": 'str'})
    df_trade.astype({"price": 'float'})
    df_trade = df_trade.groupby(by=['area_code'], as_index=False).mean()
    result_df = pd.concat([result_df, df_trade], ignore_index=True)

print(result_df)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["apart_trade_monthly_average_price"]
collection.insert_many(result_df.to_dict('records'))
