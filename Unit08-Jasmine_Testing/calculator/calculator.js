window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const principal = document.getElementById("loan-amount");
  const term = document.getElementById("loan-years");
  const rate = document.getElementById("loan-rate");
  principal.value = 150000;
  term.value = 25;
  rate.value = 3.75;
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()));
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  updateMonthly(calculateMonthlyPayment(getCurrentUIValues()
  ));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let interest = values.rate / 1200; //Monthly rate in decimal form, not percentage
  let payments = values.years * 12; // number of months
  let principal = values.amount;
  
  let monthlyPayment = (principal * interest) / (1 - ((1+interest)**(-payments)));

  //Convert to 2 decimanl points
  monthlyPayment = Math.floor(monthlyPayment*100)/100
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const payment = document.querySelector("#monthly-payment");
  payment.innerText = `$${monthly}`;
}
