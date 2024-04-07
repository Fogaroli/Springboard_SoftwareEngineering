
it('should calculate the monthly rate correctly', function () {
  expect(+calculateMonthlyPayment({"amount": 31548.23, "years" : 10, "rate" : 6})).toEqual(350.25);
  expect(+calculateMonthlyPayment({"amount": 40988.22, "years" : 10, "rate" : 0.5})).toEqual(350.25);
  expect(+calculateMonthlyPayment({"amount": 100000, "years" : 10, "rate" : 5})).toBeCloseTo(1060.66,1);
  expect(+calculateMonthlyPayment({"amount": 48000, "years" : 60, "rate" : 25})).toEqual(1000);
});


it("should return a result with 2 decimal places", function() {
  expect(calculateMonthlyPayment({"amount": 151525.35, "years" : 20, "rate" : 5})).toMatch(/^\d+\.\d{2}$/)
  expect(calculateMonthlyPayment({"amount": 150.00, "years" : 20, "rate" : 5})).toMatch(/^\d+\.\d{2}$/)
});

/// etc
