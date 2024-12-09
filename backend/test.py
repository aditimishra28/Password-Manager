import requests
import json

BASE_URL = "https://armacwan.pythonanywhere.com"
# BASE_URL = 'http://127.0.0.1:5000'


# CHECK STATE DICT
def check_state_dict():
    response = requests.get(BASE_URL + "/check_state")
    return response.text


def send_data(data):
    data = json.dumps(data)
    response = requests.post(BASE_URL + "/send_data", data=data)
    return response.text


def send_creds(data):
    data = json.dumps(data)
    response = requests.post(BASE_URL + "/send_creds", data=data)
    return response.text


def get_data(data):
    data = json.dumps(data)
    response = requests.get(BASE_URL + "/get_data", data=data)
    return response.text

# send a test package
# send_data({
#     "UID": "ID_TEST",
#     "SITE": "test_site"
# })

x = check_state_dict()
x = json.loads(x)
for i in x:
	print(x[i])
	print()
