from flask import Flask, request, render_template, redirect, flash, jsonify, make_response
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


# ******************************************************** 
# Cookies

@app.before_request
def run_before_any_rounte():
    #This function will run before any other @app route being executed. A way to track and do something before any request to the server.
    pass


request.cookies # This returns a dictionary with the value pairs for each cookie entry.
# This variable is automatically transferred to the html template, and accessible as request.cookies, no need to send it to the html as variable.
#We can access as request.cookies.items()


# On the HTML template, we can add a sub html using
{% include "other_page.html" %}

# To add a cookie using flask we need to add it to the reponse object, not to the html content. So we need to first generate the response object, add the cookie and then return the response with the cookie.

@app.route("/")
def home_page_with_cookie():
    # return "<p>Return HTML</p>" Thsi is the return body, and flask generates the response from it. (can be a templat,e or whatever)
    content = "<p>Return HTML</p>"
    res = make_response(content)
    res.set_cookie("color", "red")
    return res


# Flask Session

from flask import session
# We need a secret key in order to use for criptography on the cookie content.
# Inside the Routes we can user the sessions as a disctionary that will be converted by Flask to Cookies

@app.route(/session)
def session_demo():
    session["any_key"] = "Value"
    # We can use any type of data format here, even lists and other dictionaries.
    return "Anything, after using the cookey data"

# When using session, the data is available directly on the html template through Jinja, we can just using {{session["anything"]}} in the html



# +++++++++++++++++++++++++++++++++++++++++++++++++++++++
# Flask Unit test

# Test as added on a second file, and will look for specifics.

import app # to import the python application "app"
from unittest import TestCase

class My_Tests(TestCase):
    def test_testname(self):
        with app.test_client() as client:
            res = client.get('/') # or we can use res = client.post('url', data = {data_dic})
            # for page redirects we can use res = client.get('URL', follow_redirects=True)
            html = res.get_data(as_text = True)

            # Now set the asserts logic
            # self.assertEqual()"- res.status_code, 200"

            # To test session: 
            with client.session_transaction() as change_session:
                change_session["variable"] = "new_value"
