// First Question

function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function (num) {
        return num % 2 === 0;
    });
}

//Refactor it to use the rest operator & an arrow function:

const filterOutOdds2 = (...numbers) => numbers.filter((num) => num % 2 === 0);

console.log("filteroutodds function");
console.log(filterOutOdds(1, 3, 4, 7, 8, 9, 12, 25, 37));
console.log(filterOutOdds2(1, 3, 4, 7, 8, 9, 12, 25, 37));

//Second question
//Write a function called findMin that accepts a variable number of arguments and returns the smallest argument.
//Make sure to do this using the rest and spread operator.

function findMin(...numbers) {
    return numbers.reduce((min, current) => (min > current ? current : min));
}
console.log("findmin function");
console.log(findMin(1, 4, 12, -3)); // -3
console.log(findMin(1, -1)); // -1
console.log(findMin(3, 1));

// const findMin = (...args) => Math.min(...args)

//Third question
// Write a function called mergeObjects that accepts two objects and returns a new object which contains all the keys and values of the first object and second object.

function mergeObjects(object1, object2) {
    return { ...object1, ...object2 };
}
console.log("mergeobjects function");
console.log(mergeObjects({ a: 1, b: 2 }, { c: 3, d: 4 }));

//Fourth question
//Write a function called doubleAndReturnArgs which accepts an array and a variable number of arguments. The function should return a new array with the original array values and all of additional arguments doubled.

function doubleAndReturnArgs(array, ...numbers) {
    return [...array, ...numbers.map((number) => number * 2)];
}
console.log("doubleandreturnargs function");
console.log(doubleAndReturnArgs([1, 2, 3], 4, 4)); // [1,2,3,8,8]
console.log(doubleAndReturnArgs([2], 10, 4)); // [2, 20, 8]

//Fifith question
//For this section, write the following functions using rest, spread and refactor these functions to be arrow functions!
//Make sure that you are always returning a new array or object and not modifying the existing inputs.

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (items) => {
    const randomElement = Math.floor(Math.random() * items.length);
    return items.filter((item, index) => index !== randomElement);
};

// const removeRandom = items => {
//     let idx = Math.floor(Math.random() * items.length);
//     return [...items.slice(0, idx), ...items.slice(idx + 1)];
//   }

console.log("removeRandom function");
console.log(removeRandom([1, 2, 3, 4, 7, 12, 25]));

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => [...array1, ...array2];

console.log("extend function");
console.log(extend([1, 2, 3, 4], [7, 12, 25]));

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, newKey, val) => ({ ...obj, [newKey]: val });

console.log("addKeyVal function");
console.log(addKeyVal({ name: "Fabricio", age: "42" }, "hair", "black"));

/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    const newObject = { ...obj };
    delete newObject[key];
    return newObject;
};

console.log("remove function");
console.log(removeKey({ name: "Fabricio", age: "42", hair: "black" }, "hair"));

/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => ({ ...obj1, ...obj2 });

console.log("combine function");
console.log(combine({ name: "Fabricio", age: "42" }, { hair: "black" }));

/** Return a new object with a modified key and value. */

const update = (obj, key, val) => ({ ...obj, [key]: val });

console.log("update function");
console.log(
    update({ name: "Fabricio", age: "42", hair: "black" }, "hair", "brown")
);
