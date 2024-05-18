from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "MySecretCode"

debug = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    return render_template("root.html")