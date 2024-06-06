def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """
    def map(string):
        dict = {}
        for digit in string:
            if digit in dict.keys():
                dict[digit] +=1
            else:
                dict[digit] = 1
        return dict
    
    return map(str(num1)) == map(str(num2))