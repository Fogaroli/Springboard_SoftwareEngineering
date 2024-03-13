console.log('Hello world!');



// If statements in Javascript
//  If something {
// } else if {
// } else{
// }

// Logical operators are || (or) && (and) !(not)

// We can clear a variable settin git to "undefined"
// Null is used for objects (discitonares)
// .toString() method to convert numbers to string

let a = Math.random()
console.log(a)
console.log(Math.round(a))


// String mixed with variables - String template literal
let name = `Fabricio`
console.log(`Hi my name is ${name}`)


//  For ... of loops
let colors = ["red", "teal", "cyan", "yellow"]

for (let i = 0; i<colors.length; i++){
    console.log(colors[i])
}


for (let item of colors){ 
    console.log(item)
}

// For ... in
// Similar to the item above, but intended for objects

const crazy_object = {
    name: "some name",
    age: "freaking age",
    number: 5
}

for (let key in crazy_object) {    //For in iterates over the keys, not the elements (for of iterates over the values but not valid for objects)
    console.log(`Item ${key} -> ${crazy_object[key]}`)
}

//_____________________________________________________

// Debugging
// SyntaxError when something has been typed wrong, missing something, missng name, something missing on the code.
// ReferenceError Acessing something that does not exist, a function that has not initialized or a variable in the incorrect scope
// TypeError try to do something tha ti snot supported by that type.

//adding " debugger; " to any line will add a breakpoint in the code and will make it stop there.



//_____________________________________________________

//Error handling
// try {
//     What we want to try
// } catch (err){              // The err parameter is not necessary, but you can save your error to that variable to be used inside the catch block
//     what to do if it fails
// } finally{
//    This will run with tor without error.
// }



//Custom error
// We can use the command "trow" followed by a string, but it will just print the error string, there is no further information
// For detailed information we can use throw new Error("error string") this will print the string along with the file name and line number. This is actually an error object and has few more information iside it.
// error.name -> is the type of erro rused, above this was "Error" but there are others that cna be used.
// error.message -> The actual string that was saved inside
// error.stack -> shows the file name with full path, line and character.




//__________________________________________________________________

/*
Functions

In Javascript a function is an object, it can be stored in a variable and passed as an argument
Functions are called First Class:
    Can be passed as argument to other functions
    Return them from a function
    Can be stored in a variable

    Behaves as other data types.


*/

function greet(){
    console.log("Hi");
}

function repeat(num, whatever) {
    for (let i=0; i< num; i++){
        whatever();

    }
}

repeat(2,greet);

let functions = [greet, repeat];

functions[1](3,functions[0]);

function master(){
    return function callback(){
        console.log("This is the call back");
    }
}

master()();

const feedback = master();

feedback();



/*
Threading

Single threaded language.

*/


/*Timers

setTimeout(function, delay) This will count in the background and continue executing, then it will execute the function afterwards.
setInterval(function, interval) Repeat calling that function at the defined interval. This wil create an interval id, that can be cleared using clearInterval(id)

const id = setInterval(something, 1000)
clearInterval(id)

The timers

*/

setTimeout(function(){
 console.log("do something")
}, 2000) //this is an anonimous function, I can't call it again, this will not use memory space, and I can pass it along