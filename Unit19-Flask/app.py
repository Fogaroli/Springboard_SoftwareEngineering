from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config["SECRET_KEY"] = "MySecretCode"

debug = DebugToolbarExtension(app)

@app.route("/")
def homepage():
    return render_template("root.html")


@app.route("/form", methods=["POST"])
def process_form():
    name1 = request.form("name1")
    # Do something with the input information
    #Then through the user to a confirmation page or back to to root, but no more POST data stored in the request, so refresh does not re-load the form.
    return redirect("/confirmation")


#Adding a message with a feedback from a previous action, gone after refresh (only for one page load)
# Flask "Flash"
#Function added to the html template:

{% for msg in get_flashed_messages()%}
<p>{{msg}}</p>
{% endfor %}


#Inside the flask rounte:
flash ("Some message")

#Flash messages cna have categories:

flash ("some message", "error")

# On html:
{% for category,msg in get_flashed_messages(with_categories=True) %}
<p class="{{category}}">{{msg}}</p>
{% endfor %}

# Or go Fancy:
{% with messages = get_flashed_messages(with_categories=True) %}
{% if messages %}

<section class="messages">

{% for category,msg in messages %}
<p class="{{category}}">{{msg}}</p>
{% endfor %}

</section>

{% endif %}
{% endwith %}

# Python debugger:

import pdb
pdb.set_trace()


# to provide a json feedback:

@app.route("/json")
def jason_content():
    dic = {"key": "value"}
    return jsonify("dic")