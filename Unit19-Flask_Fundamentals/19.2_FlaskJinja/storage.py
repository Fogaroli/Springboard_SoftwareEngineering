import json
from os import path


class Storage:

    def __init__(self) -> None:
        self.stories = {}
        self.read()

    def read(self):
        with open(
            path.join(path.dirname(__file__), "stories.json"), "r"
        ) as json_library:
            self.stories = json.load(json_library)

    def save(self):
        with open(
            path.join(path.dirname(__file__), "stories.json"), "w"
        ) as json_library:
            json.dump(self.stories, json_library)
