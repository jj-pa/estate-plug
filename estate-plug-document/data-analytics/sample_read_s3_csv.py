import boto3
import csv
import pandas as pd
import io

AWS_ACCESS_KEY_ID =""
AWS_SECRET_ACCESS_KEY = ""
AWS_DEFAULT_REGION = "ap-northeast-2"

bucket, filename = "store-estate", "apart_contract_201501.csv"

# get a handle on s3
session = boto3.Session(
    aws_access_key_id=AWS_ACCESS_KEY_ID,
    aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
    region_name=AWS_DEFAULT_REGION)
s3 = session.resource('s3')

# get a handle on the bucket that holds your file
bucket = s3.Bucket('store-estate')  # example: energy_market_procesing

# get a handle on the object you want (i.e. your file)
obj = bucket.Object(key='apart_contract_201501.csv')  # example: market/zone1/data.csv

# get the object
response = obj.get()

with io.BytesIO(response['Body'].read()) as bio:
    df = pd.read_csv(bio)

print(df)

