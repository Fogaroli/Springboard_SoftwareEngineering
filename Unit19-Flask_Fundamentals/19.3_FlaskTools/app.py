from flask import Flask, request, render_template, redirect, flash, session, url_for
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)
app.config["SECRET_KEY"] = "MySecretCode"
debug = DebugToolbarExtension(app)
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False


@app.route("/")
def homepage():
    """
    Function for the landing page.
    The homepage should allow the user to select one of the available survey/quiz
    Once the survey is selected the user can submit the selection to access the survey details.
    """
    survey_dic = {key: surveys.surveys[key].title for key in surveys.surveys.keys()}
    return render_template("root.html", surveys=survey_dic)


@app.route("/survey")
def present_survey():
    """
    Function to load the survey details. This page uses the input of the selected survey form the homepage.
    Once the user go through the instructions they can stat the quiz, which sends a POST request to the /start page.
    """
    survey_code = request.args["survey"]
    survey_title = surveys.surveys[survey_code].title
    survey_instructions = surveys.surveys[survey_code].instructions
    return render_template(
        "survey_start.html",
        survey_code=survey_code,
        title=survey_title,
        instructions=survey_instructions,
    )


@app.route("/start", methods=["POST"])
def start_survey():
    """
    This function receives the POST request to start the survey and sets the required information in Flask Session.
    This function checks if the survey was already started previously, to either continue from where it stopped,
     or create the blank template to store the answers for the questions.
    This fucntion calls the first question of the survey.
    """
    survey_code = request.form["survey_code"]
    if survey_code not in session.keys():
        session[survey_code] = True
        session[f"resp_{survey_code}"] = {}
        session.permanent = True
    return redirect(f"/questions/{survey_code}/0")


@app.route("/questions/<survey_code>/<int:question_number>")
def question_page(survey_code, question_number):
    """
    This function should load the questions from the survey selected by the user.
    The function checks the number of answers already stored in the session, and move to the correct question,
    regardless of what the user selected as question number (From the previous functions, question 1 is always triggered first)
    If answers to all questions are already provided this function redirects the suer to the results age.
    NOTE - attempting to access a question that is not in the correct sequence will generate a notification to the user
    that the incorrect question was selected, while the page is reloaded at the correct sequential question.

    Once the user selects an answer and submit, a POST request is sent to the /answer route.
    """
    responses = session[f"resp_{survey_code}"]
    if len(responses) >= len(surveys.surveys[survey_code].questions):
        return redirect(f"/results/{survey_code}")
    if len(responses) == question_number:
        survey_title = surveys.surveys[survey_code].title
        question_text = surveys.surveys[survey_code].questions[question_number].question
        question_choices = (
            surveys.surveys[survey_code].questions[question_number].choices
        )
        allow_text = surveys.surveys[survey_code].questions[question_number].allow_text
        return render_template(
            "question.html",
            question=question_number,
            survey_code=survey_code,
            title=survey_title,
            text=question_text,
            choices=question_choices,
            allow_text=allow_text,
        )
    else:
        flash("You tried to access an incorrect question, you have been redirected")
        return redirect(f"/questions/{survey_code}/{len(responses)}")


@app.route("/answer", methods=["POST"])
def answer():
    """
    This function process the answers for each question sent as a post request.
    Question answers are stores in the Flask session (cookies)
    The user is redirected to the next question.
    """
    survey_code = request.form["survey_code"]
    responses = session[f"resp_{survey_code}"]
    if "text_answer" in request.form:
        text = request.form["text_answer"]
    else:
        text = ""
    responses[request.form["question"]] = {
        "answer": request.form["answer"],
        "text": text,
    }
    session[f"resp_{survey_code}"] = responses
    next_question = int(request.form["question"]) + 1
    return redirect(f"/questions/{survey_code}/{next_question}")


@app.route("/results/<survey_code>")
def show_results(survey_code):
    """
    This function is used to summarize the answers of the survey/quiz. Thsi page is triggered once all questions are answered.
    The user is able to review the answers provided.
    """
    responses = session[f"resp_{survey_code}"]
    return render_template(
        "final.html", survey=surveys.surveys[survey_code], responses=responses
    )
