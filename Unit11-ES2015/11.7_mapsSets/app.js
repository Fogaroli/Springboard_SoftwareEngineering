// Quick Question #1
// What does the following code return?
const a = new Set([1, 1, 2, 2, 3, 4]); // Set {1,2,3,4}
console.log(a);

// Quick Question #2
// What does the following code return?
const b = [...new Set("referee")].join(""); // 'ref'
console.log(b);

// Quick Questions #3
// What does the Map m look like after running the following code?
let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);

console.log(m);

// m = {[1,2,3] => true, [1,2,3] => false}

// hasDuplicate
// Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate

const hasDuplicate = (array) => new Set(array).size !== array.length;

console.log(hasDuplicate([1, 3, 2, 1])); // true
console.log(hasDuplicate([1, 5, -1, 4])); // false

// vowelCount
// Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.

const vowelCount = (string) => {
    const vowelMap = new Map();
    const stringLower = string.toLowerCase()
    for (let letter of stringLower) {
        if (/^[a,e,i,o,u]$/.test(letter)) {
            if (vowelMap.has(letter)){
                console.log("already exist")
                vowelMap.set(letter, vowelMap.get(letter) + 1)
                } else {vowelMap.set(letter, 1)};
        }
    }
    return vowelMap
};

console.log(vowelCount("awesome")); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
console.log(vowelCount("Colt")); // Map { 'o' => 1 }
