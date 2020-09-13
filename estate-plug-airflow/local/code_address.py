import pandas as pd
from sqlalchemy import create_engine
import numpy as np
from models import Base

engine = create_engine('mysql+pymysql://root:P@ssw0rd@54.180.131.157:63306/estate')
print(engine.execute('desc test').fetchone())

# Create All Tables
Base.metadata.create_all(engine)

desired_width = 1000
pd.set_option('display.max_rows', 200)
pd.set_option('display.max_columns', 500)
pd.set_option('display.width', desired_width)
np.set_printoptions(linewidth=desired_width)

df_area_code = pd.read_csv('../data/area_code.txt', sep='\t', encoding='CP949')
df_area_code.to_csv('../data/area_code.csv', header=True, index=True, encoding='utf-8')
# df_area_code = df_area_code[df_area_code['폐지여부'] == '존재']
df_area_code.rename(columns={'법정동코드': 'code', '법정동명': 'name', '폐지여부': 'delete_yn'}, inplace=True)
df_area_code.loc[df_area_code['delete_yn'] == '존재', 'delete_yn'] = True
df_area_code.loc[df_area_code['delete_yn'] == '폐지', 'delete_yn'] = False
df_area_code['upload_at'] = pd.to_datetime('today')
df_area_code = df_area_code.set_index('code')

print(df_area_code.tail())
print('법정동코드 존재 데이터 로우 수: ' + str(len(df_area_code)))

df_area_code.to_sql('TB_CODE_ADDRESS', con=engine, if_exists='append', chunksize=1000)
