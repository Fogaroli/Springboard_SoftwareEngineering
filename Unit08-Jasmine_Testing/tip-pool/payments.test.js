describe("Payment functions test (with setup and tear-down)", function() {
  beforeEach(function () {
    billAmtInput.value = 200;
    tipAmtInput.value = 25;

  });

  //test submitPymentInfo
  it('should add a new payment to the payment table on submitPayment info', function(){
    submitPaymentInfo();

    expect(Object.keys(allPayments).length).toEqual(1);
    expect(document.querySelector("#payment1 td").innerText). toEqual("$200");
    expect(document.querySelector("#summaryTable td").innerText).toEqual("$200");
    expect(billAmtInput.value).toEqual("")

  });

  //test createCurPayment, should test all possible conditions covered by the function
  it('should create a paymnet object with form input on createCurPayment()', function(){
    let testObject = createCurPayment();

    expect(Object.keys(testObject).length).toEqual(3);
    expect(testObject.billAmt).toEqual("200");

    billAmtInput.value = "";
    testObject = createCurPayment();
    expect(testObject).toBe(undefined);
    
    billAmtInput.value = 300;
    tipAmtInput.value = "";
    testObject = createCurPayment();
    expect(testObject).toBe(undefined);

    billAmtInput.value = 300;
    tipAmtInput.value = -20;
    testObject = createCurPayment();
    expect(testObject).toBe(undefined);

    billAmtInput.value = -100;
    tipAmtInput.value = 20;
    testObject = createCurPayment();
    expect(testObject).toBe(undefined);
  });


  //test appedPaymentTable should validate correct elements are created at the DOM
  it('should create new HTML elements in the Payment table on appendPaymentTable()', function(){
    let payment = {"billAmt" : '200',"tipAmt" : '25',"tipPercent" : 13};
    paymentId += 1; 
    appendPaymentTable(payment);
    payment = {"billAmt" : '300',"tipAmt" : '30',"tipPercent" : 10};
    paymentId += 1; 
    appendPaymentTable(payment);
    expect(document.querySelector("#payment2").tagName).toEqual('TR');
    expect(document.querySelector("#payment2 td").innerText).toEqual('$300');
    expect(document.querySelector("#payment2 td").nextElementSibling.innerText).toEqual('$30');
    expect(document.querySelector("#payment2 td").nextElementSibling.nextElementSibling.nextElementSibling.innerText).toEqual('X');
  });

  //test updateSummary shoudl increment total values on the summary table when new payment is processed
  it('should update the summary table on updateSummary()', function(){
    updateSummary()
    expect(summaryTds[2].innerHTML).toEqual('0%');

    let billAmt = "100";
    let tipAmt = "20";
    let tipPercent = 20
    allPayments["payment1"] = {billAmt, tipAmt, tipPercent}
    allPayments["payment2"] = {billAmt, tipAmt, tipPercent}
    updateSummary()
    expect(summaryTds[0].innerHTML).toEqual('$200');
    expect(summaryTds[1].innerHTML).toEqual('$40')
    expect(summaryTds[2].innerHTML).toEqual('20%')

  })

  //test function to remove payment from table
  it('should remove payment entrey from payment table on removePayment()', function(){
    let payment = {"billAmt" : '200',"tipAmt" : '25',"tipPercent" : 13};
    paymentId += 1; 
    allPayments["payment1"] = payment
    appendPaymentTable(payment);
    payment = {"billAmt" : '300',"tipAmt" : '30',"tipPercent" : 10};
    paymentId += 1; 
    allPayments["payment2"] = payment
    appendPaymentTable(payment);

    const evt = {target: document.querySelector("#payment1 td button")};
    removePayment(evt);

    expect(allPayments.payment1).toBe(undefined);
    expect(document.querySelector("#payment1")).toBe(null);
    expect(document.querySelector("#payment2")).not.toBe(null);

  });


  afterEach(function() {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    allPayments = {};
    paymentId = 0;
    paymentTbody.innerHTML = "";
    for(let td of summaryTds){
      td.innerHTML = "";
    }
    
  });
    
});
    