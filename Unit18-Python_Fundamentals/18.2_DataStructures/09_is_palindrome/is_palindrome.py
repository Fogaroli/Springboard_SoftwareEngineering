def is_palindrome(phrase):
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
    list_of_chars = [char.lower() for char in phrase if char != " "]
    reversed_chairs = list_of_chars.copy()
    reversed_chairs.reverse()
    return list_of_chars == reversed_chairs
