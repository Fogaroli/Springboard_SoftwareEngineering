def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = ["a", "e", "i", "o", "u"]
    index_list = []
    string_list = list(s)
    final_string = string_list.copy()
    for index in range(0, len(string_list)):
        if string_list[index].lower() in vowels:
            index_list.append(index)
    index_reversed = index_list.copy()
    index_reversed.reverse()
    for index in range(0, len(index_list)):
        final_string[index_list[index]] = string_list[index_reversed[index]]
    return "".join(final_string)
    