describe("Helper functions test (with setup and tear-down)", function() {
    beforeEach(function () {
        let billAmt = "100";
        let tipAmt = "20";
        let tipPercent = 20
        allPayments["payment1"] = {billAmt, tipAmt, tipPercent}
    });

    //test if total payment is properly calculated at sumPAymentTotal.
    it('should calculate total payments entered in the form on sumPaumentTotal()', function(){
        expect(sumPaymentTotal("billAmt")).toEqual(100);
        expect(sumPaymentTotal("tipAmt")).toEqual(20);
        expect(sumPaymentTotal("tipPercent")).toEqual(20);
        expect(sumPaymentTotal("random")).toEqual(NaN);
        expect(Object.keys(allPayments).length).toEqual(1);
    });


    //test function to calculate percentage
    it('should calculate percentage of tip from payment on calculateTipPercentage()', function(){

        expect(calculateTipPercent(100, 20)).toEqual(20); //Happy path check
        expect(calculateTipPercent(100, "20")).toEqual(20); // check for data type
        expect(calculateTipPercent(1000.00, 4)).toEqual(0); // round for smmall number
        expect(calculateTipPercent(1000.00, 5)).toEqual(1); // round for large number
        expect(calculateTipPercent(4, 1000)).toEqual(25000); // reversed numbers
    });

    //test function that creates 2 <TD> objects
    it('should append a <td> object to a provided tr with provided content on appendTd()', function(){
        const test_tr = document.createElement("tr");
        appendTd(test_tr, "My_name");
        expect(test_tr.innerHTML).toEqual("<td>My_name</td>");
    });

    //test function that adds a delete button to each server added to the server table
    it('should add a delete button to the server table on appendDeletebtn()', function () {
        const test_tr = document.createElement("tr");
        appendDeleteBtn(test_tr);
        expect(test_tr.innerHTML).toEqual("<td><button>X</button></td>");
    })


    afterEach(function() {
        allPayments = {};
      });


});
    