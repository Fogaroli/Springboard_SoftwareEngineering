//Same keys and values

function createInstructor(firstName, lastName) {
    return {
        firstName: firstName,
        lastName: lastName,
    };
}
//Write an ES2015 Version

const createInstructor2 = (firstName, lastName) => ({ firstName, lastName });

console.log(createInstructor("fabricio", "Ribeiro"));
console.log(createInstructor2("fabricio", "Ribeiro"));

// Computed Property Names

var favoriteNumber = 42;

var instructor = {
    firstName: "Colt",
};

instructor[favoriteNumber] = "That is my favorite!";

//Write an ES2015 Version

let favoriteNumber2 = 42;

const instructor2 = {
    firstname: "Colt",
    [favoriteNumber2]: "That is my favorite!",
};

console.log(instructor);
console.log(instructor2);

// Object Methods
var instructor3 = {
    firstName: "Colt",
    sayHi: function () {
        return "Hi!";
    },
    sayBye: function () {
        return this.firstName + " says bye!";
    },
};

//Write an ES2015 Version

const instructor4 = {
    firstName: "Colt",
    sayHi() {
        return "Hi";
    },
    sayBye() {
        this.firstName + " says bye!";
    },
};

console.log(instructor3);
console.log(instructor4);

//Animal Function

function createAnimal(species, verb, noise) {
    return {
        species,
        [verb]() {
            return noise;
        },
    };
}

const d = createAnimal("dog", "bark", "Woooof!");
console.log(d); // {species: "dog", bark: ƒ}
console.log(d.bark()); //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa");
console.log(s); // {species: "sheep", bleet: ƒ}
console.log(s.bleet());
