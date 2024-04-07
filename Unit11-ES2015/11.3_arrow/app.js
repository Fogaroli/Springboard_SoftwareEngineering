//Exercise

function double(arr) {
    return arr.map(function (val) {
        return val * 2;
    });
}

console.log(double([5, 5, 7, 8]));

/* Write an ES2015 Version */

const double2 = (arr) => arr.map((val) => val * 2);

console.log(double2([5, 5, 7, 8]));

/*==================================================================*/

function squareAndFindEvens(numbers) {
    var squares = numbers.map(function (num) {
        return num ** 2;
    });
    var evens = squares.filter(function (square) {
        return square % 2 === 0;
    });
    return evens;
}

console.log(squareAndFindEvens([2, 3, 4, 6, 7, 9, 12, 25, 32]));

const squareAndFindEvens2 = (numbers) =>
    numbers.map((num) => num ** 2).filter((square) => square % 2 === 0);

console.log(squareAndFindEvens2([2, 3, 4, 6, 7, 9, 12, 25, 32]));
