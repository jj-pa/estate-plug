import pandas as pd
from io import StringIO

"""
*******************************************************************************
* read_trade()                          S3 CSV파일 로드
* @param [in]               <_s3Obj>    S3 Client / Init_S3Client() 로드 필수
* @param [in | str]         <_item>     Target context ("aprat", "land"..)
* @param [in | str]         <_year>     Target year ("2015"~)
* @param [in | str]         <_month>    Target month ("01"~"12")
* @return                   <df>        item, year, month에 해당 csv DataFrame 데이터
*******************************************************************************
"""
def read_trade(_s3Obj, _item, _year, _month):
    s3FileName = _item + "_trade_" + _year + _month + ".csv"
    print("read... " + s3FileName)

    csv_obj = _s3Obj.get_object(Bucket='store-estate', Key=s3FileName)
    body = csv_obj['Body']
    csv_string = body.read().decode('utf-8')

    df = pd.read_csv(StringIO(csv_string))

    # Drop Unnecessary Columns
    df = df.drop(df.columns[0], axis='columns')

    return df


"""
*******************************************************************************
* Count_Trade()                            지역코드별 Row 개수
* @param [in]               <dataframe>    CSV Dataframe Data
* @return                   <df>           지역코드별 Row 개수 DataFrame
*******************************************************************************
"""
def count_trade(dataframe):
    seriesData = dataframe['지역코드'].value_counts().sort_index()
    if '지역코드' in seriesData:
        seriesData = seriesData.drop('지역코드')  # Filtering

    seriesData.index = seriesData.index.astype(int)

    df = seriesData.to_frame()
    return df


def target_area_trade_increase_decrease(_targetItem, _targetYear, _targetBeginMonth, _targetEndMonth, _targetAreadCode, _client):
    target_trade_count_list = []
    diff_before_target_trade_count_list = [];

    for monthStr in range(_targetBeginMonth, _targetEndMonth + 1):

        if monthStr < 10:
            monthStr = "0" + str(monthStr)
        else:
            monthStr = str(monthStr)

        df = read_trade(_s3Obj=_client,
                        _item=_targetItem,
                        _year=str(_targetYear),
                        _month=monthStr)

        filterCountTrade = count_trade(df)

        target_trade_count_list.append(filterCountTrade)

        beforeIdx = 0
        currentIdx = 0


def per_delta(start, end, delta):
    curr = start
    while curr < end:
        yield curr
        curr += delta