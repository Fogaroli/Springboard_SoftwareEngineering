from flask import Flask, request
from operations import *

app = Flask(__name__)

OPERATIONS = {"add": add, "sub": sub, "mult": mult, "div": div}


@app.route("/add")
def calc_add():
    a = request.args["a"]
    b = request.args["b"]
    result = add(int(a), int(b))
    return str(result)


@app.route("/sub")
def calc_sub():
    a = request.args["a"]
    b = request.args["b"]
    result = sub(int(a), int(b))
    return str(result)


@app.route("/mult")
def calc_mult():
    a = request.args["a"]
    b = request.args["b"]
    result = mult(int(a), int(b))
    return str(result)


@app.route("/div")
def calc_div():
    a = request.args["a"]
    b = request.args["b"]
    result = div(int(a), int(b))
    return str(result)


@app.route("/math/<operation>")
def calc(operation):
    a = request.args["a"]
    b = request.args["b"]
    result = OPERATIONS[operation](int(a), int(b))
    return str(result)
