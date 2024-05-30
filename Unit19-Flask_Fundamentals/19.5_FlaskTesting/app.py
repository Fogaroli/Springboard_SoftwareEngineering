from flask import Flask, render_template, session, request, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.config["SECRET_KEY"] = "MySecretCode"

debug = DebugToolbarExtension(app)
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False


@app.route("/")
def homepage():
    """
    This is the landing page, it should present thegameand allow the user to select the size of the board
    they want to play.
    Submitting the board size, should load the route /game with the size parameters as arguments of the page.
    """
    return render_template("home.html")


@app.route("/game")
def game():
    """
    The main gamepage. With the information provided in the lading page this should load a game board with
    the specified size with random letters.
    Board is rendered as a grid
    This page should load maximum score and number of games played from Flask session data.
    The page should provide the user a form where
    """
    lines = int(request.args["lines"])
    columns = int(request.args["columns"])
    board = boggle_game.make_board(lines, columns)
    session["board"] = board
    if "record" in session.keys():
        record = session["record"]
    else:
        record = 0
    if "playedtimes" in session.keys():
        playedtimes = session["playedtimes"]
    else:
        playedtimes = 0
    return render_template(
        "game.html", board=board, record=record, playedtimes=playedtimes
    )


@app.route("/word", methods=["POST"])
def submit_word():
    """
    This route performs the API function to check if the word provided is valid.
    There are 3 possible results, from the Boggle class method that is passed on as response in json format
    """
    word = request.json["word"]
    board = session["board"]
    check_word = boggle_game.check_valid_word(board, word)
    return jsonify({"result": check_word})


@app.route("/save", methods=["POST"])
def save_data():
    """
    This route performs the api function to save datato the flask session.
    It should store the score record (in case a new recordis achived) and incrment the  number of games played.
    The updated information is provided as response in json format to be updated in the frontend.
    """
    new_record = int(request.json["score"])
    playedtimes = 1
    if "record" in session.keys():
        if int(session["record"]) > new_record:
            new_record = int(session["record"])
    if "playedtimes" in session.keys():
        playedtimes = session["playedtimes"] + 1
    session["record"] = new_record
    session["playedtimes"] = playedtimes
    return jsonify({"record": new_record, "played-times": playedtimes})
