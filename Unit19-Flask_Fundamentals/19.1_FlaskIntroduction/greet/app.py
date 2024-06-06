from flask import Flask

app = Flask(__name__)


@app.route("/welcome")
def welcome_page():
    return "welcome"


@app.route("/welcome/home")
def welcomehome_page():
    return "welcome home"


@app.route("/welcome/back")
def welcomeback_page():
    return "welcome back"
