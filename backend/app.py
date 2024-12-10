from flask import Flask, request
import json

app = Flask(__name__)

print("SERVICE STARTED")

STATE_DICT = {}  # Global variable


@app.route("/")
def check_health():
    return "OK"


@app.route("/check_state")
def check_state():
    return STATE_DICT


# EXTENSION SENDS DATA TO THE SERVER HERE
# THIS WILL INCLUDE A UNIQUE ID AND SITE NAME
@app.route("/send_data", methods=["POST"])
def send_data():
    global STATE_DICT
    data = request.get_data()
    data = json.loads(data)

    UID = data["UID"]
    SITE = data["SITE"]

    STATE_DICT[UID] = {"UID": UID, "SITE": SITE, "STATUS": False}

    return {200: "OK"}


# PHONE APP WILL SEND CREDS HERE WITH THE UNIQUE ID
@app.route("/send_creds", methods=["POST"])
def send_creds():
    global STATE_DICT
    data = request.get_data()
    data = json.loads(data)

    UID = data["UID"]
    USERNAME = data["USERNAME"]
    PASSWORD = data["PASSWORD"]

    if UID not in STATE_DICT:
        return "UID NOT FOUND"

    STATE_DICT[UID]["USERNAME"] = USERNAME
    STATE_DICT[UID]["PASSWORD"] = PASSWORD
    STATE_DICT[UID]["STATUS"] = True

    return {200: "OK"}


@app.route("/get_data", methods=["POST"])
def get_data():
    global STATE_DICT
    data = request.get_data()
    data = json.loads(data)

    UID = data["UID"]

    if UID not in STATE_DICT:
        return "UID NOT FOUND"

    if not STATE_DICT[UID]["STATUS"]:
        return "CREDS NOT FOUND"

    responce = {
        "UID": UID,
        "SITE": STATE_DICT[UID]["SITE"],
        "USERNAME": STATE_DICT[UID]["USERNAME"],
        "PASSWORD": STATE_DICT[UID]["PASSWORD"],
    }

    del STATE_DICT[UID]

    return responce


if __name__ == "__main__":
    app.run(debug=True)