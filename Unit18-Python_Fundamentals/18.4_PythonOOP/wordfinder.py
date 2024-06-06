"""Word Finder: finds random words from a dictionary."""

from random import choice


class WordFinder:
    """Random word finder object

    Usage : WordFinder(<WordList path>)
    WordList Path should direct to a list of words to be used by the object. Text file format, one word on each line.

    >>> word = WordFinder("words.txt")
    235887 words read

    >>> random()


    """

    def __init__(self, path) -> None:
        with open(path, "r") as word_list:
            self.file_content = word_list.read().splitlines()
        self._print_data()

    def _print_data(self):
        print(f"{len(self.file_content)} words read")
        return

    def random(self):
        """Method to read a random word from the word list file provided."""
        return choice(self.file_content)


class SpecialWordFinder(WordFinder):
    """Special word finder classs.
    Will ifnore empty spaces on the word list and words starting with #
    
    
    
    
    
    
    """

    def __init__(self, path) -> None:
        super().__init__(path)

    def random(self):
        """Method to read a random word from the word list file provided. Excluding empty space and words starting with '#'"""
        self.random_word = super().random()
        while len(self.random_word) == 0 or self.random_word.startswith("#"):
            self.random_word = super().random()
        return self.random_word
