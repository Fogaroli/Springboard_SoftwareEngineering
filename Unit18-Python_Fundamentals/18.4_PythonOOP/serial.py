"""Python serial number generator."""


class SerialGenerator:
    """Machine to create unique incrementing serial numbers.

    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """

    def __init__(self, start) -> None:
        self.start_number = start
        self.reset()

    def __repr__(self) -> str:
        return f"SerialGenerator Next={self.number} Start={self.start_number}"

    def generate(self):
        """Method to request the next number in the serial generator"""
        current_number = self.number
        self.number += 1
        return current_number

    def reset(self):
        """Method to reset the serial generator back to the starting value (defined when the object was created)"""
        self.number = self.start_number
