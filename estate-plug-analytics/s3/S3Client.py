import boto3
import botostubs


def get_s3_client():
    AWS_ACCESS_KEY_ID = "AKIAT4IAQPVVMMBS2FNX"
    AWS_SECRET_ACCESS_KEY = "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"
    AWS_DEFAULT_REGION = "ap-northeast-2"
    client = boto3.client('s3',
                          aws_access_key_id=AWS_ACCESS_KEY_ID,
                          aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
                          region_name=AWS_DEFAULT_REGION
                          )  # type: botostubs.S3
    return client


def print_buckets(_client):
    response = _client.list_buckets()
    print('Existing buckets:')
    for bucket in response['Buckets']:
        print(f'  {bucket["Name"]}')


def print_bucket_files(_client, _bucket_name):
    for key in _client.list_objects(Bucket=_bucket_name)['Contents']:
        print(key['Key'])
