def print_upper_words_string(long_string):
    """
    Prints all words from the provided long string in upercase, one word per line.
    """
    string_array = long_string.split(" ")
    for word in string_array:
        print(word.upper())


def print_upper_words_list(words_list):
    """
    Prints all words from the provided list in upercase, one word per line.
    """
    for word in words_list:
        print(word.upper())


def print_upper_words_starting_e(words_list):
    """
    Prints all words starting with 'e' from the provided list in upercase, one word per line.
    """
    for word in words_list:
        if word.upper().startswith("E"):
            print(word.upper())


def print_upper_words(words_list, must_start_with):
    """
    Prints all words from the provided list that starts with any of the letters provided as argument. Words are printed un uppercase, one word per line.
    Arguments:
    words_list: list of words to be evaluated
    must_start_with: dictionary of letter to be used for selection e.g. {"a", "b"}
    """
    letters_uppercase = [x.upper() for x in must_start_with]
    for word in words_list:
        if word.upper()[0] in letters_uppercase:
            print(word.upper())
