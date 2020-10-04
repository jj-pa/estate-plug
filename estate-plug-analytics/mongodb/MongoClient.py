import datetime
from pymongo import MongoClient  # for MongoDB

"""
*******************************************************************************
* Connect_Mongo()                     MongDB 접속
* @return                 <mydb>      MogoDB 반환
*******************************************************************************
"""
def connect_mongo():
    my_client = MongoClient(
        "mongodb://root:P%40ssw0rd@52.79.55.128:27017/?authSource=admin&readPreference=primary&ssl=false")

    print(my_client.list_database_names())

    mydb = my_client['estate-plug']
    return mydb


def insert_apart_trade_targetarea_increase(target_area_codeData, year_monthData, increaseData):
    myDB = connect_mongo()
    myCol = myDB["apart_test"]
    x = myCol.insert_one(
        {"target_area_code": target_area_codeData, "year_month": year_monthData, "increase": increaseData,
         "createdAt": datetime.datetime.now(), "updatedAT": datetime.datetime.now()})
    print(x.inserted_id)
