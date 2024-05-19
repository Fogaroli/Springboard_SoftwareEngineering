from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import surveys

app = Flask(__name__)
app.config["SECRET_KEY"] = "MySecretCode"
debug = DebugToolbarExtension(app)

responses = []


@app.route("/")
def homepage():
    survey_title = surveys.satisfaction_survey.title
    survey_instructions = surveys.satisfaction_survey.instructions
    return render_template(
        "root.html", title=survey_title, instructions=survey_instructions
    )


@app.route("/questions/<int:question_number>")
def question_page(question_number):
    if question_number >= len(surveys.satisfaction_survey.questions):
        return redirect("/final")
    survey_title = surveys.satisfaction_survey.title
    question_text = surveys.satisfaction_survey.questions[question_number].question
    question_choices = surveys.satisfaction_survey.questions[question_number].choices
    allow_text = surveys.satisfaction_survey.questions[question_number].allow_text
    if len(responses) == question_number:
        return render_template(
            "question.html",
            title=survey_title,
            question=question_number,
            text=question_text,
            choices=question_choices,
            allow_text=allow_text,
        )
    else:
        flash("You tried to access an incorrect question, you have been redirected")
        return redirect(f"/questions/{len(responses)}")


@app.route("/final")
def final_page():
    return render_template("final.html")


@app.route("/answer", methods=["POST"])
def answer():
    responses.append(request.form["answer"])
    next_question = int(request.form["question"]) + 1
    return redirect(f"/questions/{next_question}")
