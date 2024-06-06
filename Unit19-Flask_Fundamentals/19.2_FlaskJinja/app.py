from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import Story
from storage import Storage

app = Flask(__name__)
app.config["SECRET_KEY"] = "MySecretCode"

debug = DebugToolbarExtension(app)

library = Storage()


@app.route("/")
def homepage():
    library.read()
    templates = [(item, library.stories[item]["text"]) for item in library.stories]
    return render_template("root.html", templates=templates)


@app.route("/form/<story_id>")
def form_page(story_id):
    return render_template(
        "form.html", words=library.stories[story_id]["words"], id=story_id
    )


@app.route("/story")
def generate_story():
    story_id = request.args["id"]
    story = Story(library.stories[story_id]["words"], library.stories[story_id]["text"])
    answer = {
        key: request.args[f"{key}"].lower()
        for key in library.stories[story_id]["words"]
    }
    return render_template("story.html", text=story.generate(answer))


@app.route("/new")
def new_text():
    return render_template("new_text.html")


@app.route("/add")
def add_text():
    words = [word.strip() for word in request.args["words"].split(",")]
    text = request.args["text"]
    new_index = [int(item) for item in library.stories][-1] + 1
    library.stories[str(new_index)] = {"words": words, "text": text}
    library.save()
    return render_template("added_text.html")
