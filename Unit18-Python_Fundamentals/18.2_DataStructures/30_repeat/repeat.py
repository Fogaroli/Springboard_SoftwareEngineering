def repeat(phrase, num):
    """Return phrase, repeated num times.

        >>> repeat('*', 3)
        '***'

        >>> repeat('abc', 2)
        'abcabc'

        >>> repeat('abc', 0)
        ''

    Ignore illegal values of num and return None:

        >>> repeat('abc', -1) is None
        True

        >>> repeat('abc', 'nope') is None
        True
    """
    repeat_string = []
    if type(num) == int and num > -1:
        for index in range(0,num):
            repeat_string.append(phrase)
        return "".join(repeat_string)
    return None
