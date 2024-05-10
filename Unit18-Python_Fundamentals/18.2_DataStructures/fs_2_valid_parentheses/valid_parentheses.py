def valid_parentheses(parens):
    """Are the parentheses validly balanced?

    >>> valid_parentheses("()")
    True

    >>> valid_parentheses("()()")
    True

    >>> valid_parentheses("(()())")
    True

    >>> valid_parentheses(")()")
    False

    >>> valid_parentheses("())")
    False

    >>> valid_parentheses("((())")
    False

    >>> valid_parentheses(")()(")
    False
    """
    sum = 0
    for paren in parens:
        if ord(paren) == 40:
            sum += 1
        elif ord(paren) == 41:
            sum -= 1
        if sum < 0:
            return False
    if sum == 0:
        return True
    else:
        return False
