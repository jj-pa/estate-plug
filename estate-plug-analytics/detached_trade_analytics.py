import pandas as pd
from datetime import date
from dateutil.relativedelta import relativedelta
from mongodb import connect_mongo
from s3 import get_s3_client, print_buckets, print_bucket_files
from util import count_trade, read_trade, target_area_trade_increase_decrease, per_delta

# %%
client = get_s3_client()
# %%
print_buckets(client)
# %%
print_bucket_files(client, 'store-estate')
# %%
# 전월 대비 거래량 차이 (연 매매 증감율) - 2015, 2016
client = get_s3_client()  # s3 client

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
    year_month_data.append(result.strftime("%Y%m"))  # 연월 관리 변수에 추가
    df_trade = read_trade(_s3Obj=client, _item="detached", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade_count = count_trade(df_trade)  # 아파트 매매 거래 한달 데이터 -> 지역코드별 카운트 산출
    df_trade_count_arr.append(df_trade_count)  # 지역코드별 로우 개수 List 추가

# 전월 대비 거래량 차이 저장
diff_prev_month = list()
result_df = pd.DataFrame(columns=['area_code', 'year_month', 'value'])  # 결과 프레임 생성 (지역코드, 연월, 카운트)
for idx, item in enumerate(df_trade_count_arr):
    # 처음 루틴에서는 처음 월을 위해 0 값 설정 데이터 생성
    if idx == 0:
        init_df = df_trade_count_arr[idx + 1] - df_trade_count_arr[idx]
        init_df['year_month'] = year_month_data[0]  # 초기 날짜 데이터 추가 (ex: 201501)
        init_df['area_code'] = init_df.index  # 지역코드 컬럼 추가 (인덱스)
        init_df.reset_index(level=0, inplace=True, drop=True)  # 인덱스 초기화
        init_df.rename(columns={'지역코드': 'value'}, inplace=True)  # 값 컬럼명 변경
        init_df['value'] = 0  # 초기값 0으로 설정
        init_df = init_df[['area_code', 'year_month', 'value']].sort_values(by=['area_code'], axis=0)  # 컬럼 순서 변경
        result_df = pd.concat([result_df, init_df], ignore_index=True)

    # 결과 데이터프레임에 전월 대비 프레임 병합
    if idx < len(df_trade_count_arr) - 1:
        diff_df = df_trade_count_arr[idx + 1] - df_trade_count_arr[idx]
        diff_df['year_month'] = year_month_data[idx + 1]  # 날짜 데이터 추가
        diff_df['area_code'] = diff_df.index  # 지역코드 컬럼 추가 (인덱스)
        diff_df.reset_index(level=0, inplace=True, drop=True)  # 인덱스 초기화
        diff_df.rename(columns={'지역코드': 'value'}, inplace=True)  # 값 컬럼명 변경
        diff_df = diff_df[['area_code', 'year_month', 'value']].sort_values(by=['area_code'], axis=0)  # 컬럼 순서 변경
        result_df = pd.concat([result_df, diff_df], ignore_index=True)

print(result_df)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["detached_trade_monthly_increase_decrease"]
collection.insert_many(result_df.to_dict('records'))

# %%
# 지역별 월 평균 거래 금액 - 2015, 2016
client = get_s3_client()  # s3 client

# 날짜 변수 생성
year_month_data = list()
start_year = 2015
start_month = 1
end_year = 2015
end_month = 12

# 날짜 범위만큼 단독/다세대 매매 데이터 로드
result_df = pd.DataFrame(columns=['area_code', 'price'])
for result in per_delta(date(year=int(start_year), month=int(start_month), day=1),
                        date(year=int(end_year), month=int(end_month), day=28),
                        relativedelta(months=1)):
    df_trade = read_trade(_s3Obj=client, _item="detached", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade.drop(columns=['년', '월', '일', '법정동', '매매일', '건축년도', '연면적', '대지면적', '주택유형'], inplace=True)
    df_trade.rename(columns={'거래금액': 'price', '지역코드': 'area_code'}, inplace=True)  # 값 컬럼명 변경

    df_trade['year_month'] = result.strftime("%Y%m")  # 날짜 데이터 추가
    df_trade = df_trade[df_trade['price'].astype(str) != '거래금액']
    df_trade = df_trade.astype(float)
    df_trade.astype({"area_code": 'str'})
    df_trade.astype({"price": 'float'})

    df_trade = df_trade.groupby(by=['area_code', 'year_month'], as_index=False).mean()  # 지역 그룹
    result_df = pd.concat([result_df, df_trade], ignore_index=True)

print(result_df)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["detached_trade_monthly_average_price"]
collection.insert_many(result_df.to_dict('records'))

# %%
# 연 매매 거래비중 상위 10개 구 (거래금액) - 2015, 2016
client = get_s3_client()  # s3 client

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
    df_trade = read_trade(_s3Obj=client, _item="detached", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade.drop(columns=['년', '월', '일', '법정동', '매매일', '건축년도', '연면적', '대지면적', '주택유형'], inplace=True)
    df_trade.rename(columns={'거래금액': 'price', '지역코드': 'area_code'}, inplace=True)  # 값 컬럼명 변경
    df_trade['year'] = result.strftime("%Y")  # 날짜 데이터 추가
    df_trade = df_trade[df_trade['price'].astype(str) != '거래금액'].astype(float)  # 이상 값 필터링
    df_trade.astype({"area_code": 'str'})
    df_trade.astype({"price": 'float'})

    df_trade = df_trade.groupby(by=['area_code', 'year'], as_index=False).sum()
    result_df = pd.concat([result_df, df_trade], ignore_index=True)

result_df = result_df.groupby(by=['area_code', 'year'], as_index=False).sum().\
    sort_values(by='price', ascending=False).head(10)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["detached_trade_yearly_sum_price_top_10"]
collection.insert_many(result_df.to_dict('records'))


# %%
# 연 매매 거래비중 상위 10개 구 (매매 건) - 2015, 2016
client = get_s3_client()  # s3 client

# 날짜 변수 생성
year_month_data = list()
start_year = 2015
start_month = 1
end_year = 2015
end_month = 12

# 날짜 범위만큼 아파트 매매 데이터 로드
result_df = pd.DataFrame(columns=['area_code', 'count'])
for result in per_delta(date(year=int(start_year), month=int(start_month), day=1),
                        date(year=int(end_year), month=int(end_month), day=28),
                        relativedelta(months=1)):
    df_trade = read_trade(_s3Obj=client, _item="detached", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade_count = count_trade(df_trade)  # 아파트 매매 거래 한달 데이터 -> 지역코드별 카운트 산출
    df_trade_count['year'] = result.strftime("%Y")  # 날짜 데이터 추가
    df_trade_count['area_code'] = df_trade_count.index  # 지역코드 컬럼 추가 (인덱스)
    df_trade_count.reset_index(level=0, inplace=True, drop=True)  # 인덱스 초기화
    df_trade_count.rename(columns={'지역코드': 'count'}, inplace=True)  # 값 컬럼명 변경
    result_df = pd.concat([result_df, df_trade_count], ignore_index=True)

result_df = result_df.groupby(by=['area_code', 'year'], as_index=False).sum().\
    sort_values(by='count', ascending=False).head(10)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["detached_trade_yearly_count_top_10"]
collection.insert_many(result_df.to_dict('records'))

# %%
# 지역별 평당 매매 금액 상위 10개 지역 - 2015
client = get_s3_client()  # s3 client

# 날짜 변수 생성
year_month_data = list()
start_year = 2015
start_month = 1
end_year = 2015
end_month = 12

# 날짜 범위만큼 아파트 매매 데이터 로드
result_df = pd.DataFrame(columns=['area_code'])
for result in per_delta(date(year=int(start_year), month=int(start_month), day=1),
                        date(year=int(end_year), month=int(end_month), day=28),
                        relativedelta(months=1)):
    df_trade = read_trade(_s3Obj=client, _item="detached", _year=result.strftime("%Y"), _month=result.strftime("%m"))
    df_trade.drop(columns=['년', '월', '일', '법정동', '매매일', '건축년도', '대지면적', '주택유형'], inplace=True)
    df_trade.rename(columns={'거래금액': 'price', '지역코드': 'area_code', '연면적': 'size'}, inplace=True)  # 값 컬럼명 변경
    df_trade['year'] = result.strftime("%Y")
    df_trade['year_month'] = result.strftime("%Y%m")  # 날짜 데이터 추가
    df_trade = df_trade[df_trade['price'].astype(str) != '거래금액'].astype(float)  # 이상 값 필터링
    df_trade.astype({"area_code": 'str'})
    df_trade.astype({"price": 'float'})

    df_trade['pyeong'] = df_trade['size'] / 3.3  # 전용면적 평 수 계산
    df_trade['pyeong'] = df_trade['pyeong'].round(0)  # 소수점 반올림 처리
    df_trade['pyeong_price'] = df_trade['price'] / df_trade['pyeong']  # 평당 금액
    result_df = pd.concat([result_df, df_trade], ignore_index=True)  # 프레임 병합

result_df.drop(columns=['price', 'size', 'pyeong', 'year_month'], inplace=True)  # 프레임 필요없는 컬럼 제거
result_df = result_df.groupby(by=['area_code', 'year'], as_index=False).mean()  # 평 금액 평균 값 산출
result_df['pyeong_price'] = result_df['pyeong_price'].round(0)  # 평당 금액 반올림 처리
result_df = result_df.groupby(by=['area_code', 'year'], as_index=False).sum().\
    sort_values(by='pyeong_price', ascending=False).head(10)

# 데이터베이스 프레임 삽입
database = connect_mongo()
collection = database["detached_trade_monthly_pyeong_price_top_10"]
collection.insert_many(result_df.to_dict('records'))

