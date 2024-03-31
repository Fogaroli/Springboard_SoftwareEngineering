function main() {
  /*
.forEach method can be applied to an array to loop through the array and process one entry at a time.
array.forEach(function())
    The arguments for my function can be (they are optional), (each value, value index, entire array).


.map method similar to for each to call a function for each item in teh array and add the return value to a new array.
    There will be one to one, one item form the array input, will become another itme on the return array.
    Same parameters as the above

string.indexOf("ministring"), will give 1 if true and -1 if false.

.some returns a boolean, similar to an OR evaluated on a function (callback) for each item in an array. (translated to any)

.every returns a boolean, similar to an AND evaluated on a function (callback) for each item in an array.(translated to all)
    
*/
}

document.addEventListener("DOMContentLoaded", main);

// Examples:
//     vowelCount('Elie') // {e:2,i:1};
//     vowelCount('Tim') // {i:1};
//     vowelCount('Matt') // {a:1})
//     vowelCount('hmmm') // {};
//     vowelCount('I Am awesome and so are you') // {i: 1, a: 4, e: 3, o: 3, u: 1};
// 

function vowelCount(str) {
    const stringArray = [...str];
    return stringArray.reduce(function(countObject, letter){
        console.log(countObject)
        let lowerLetter = letter.toLowerCase()
        const vowelCount = countObject;
        if (/^[a,e,i,o,u]$/.test(lowerLetter)) {

            if (vowelCount[lowerLetter] != undefined) {
                vowelCount[lowerLetter] += 1;
            } else {
                vowelCount[lowerLetter] = 1;
            }

        }
        return vowelCount;
      }, {}); 
}

vowelCount('Elie')