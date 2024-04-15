/*
Title: Car Object-Oriented Programming Challenge
Author: Fabricio Fogaroli Ribeiro
Date: April 7, 2024
*/

//Global variables

//================================================================
//Feature Functions

class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep.";
    }

    toString() {
        const { make, model, year } = this;
        return `The vehicle is a ${make} ${model} from ${year}.`;
    }
}

class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}

class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }

    revEngine() {
        return `VROOM!!!`;
    }
}

class Garage {
    constructor(size) {
        this.size = size;
        this.vehicles = [];
    }

    isValidVehicle(vehicle) {
        return !vehicle.make || !vehicle.model || !vehicle.year;
    }

    add(vehicle) {
        if (this.isValidVehicle(vehicle)) {
            return "Only vehicles are allowed in here!";
        }
        if (this.vehicles.length < this.size) {
            this.vehicles.push(vehicle);
            return "Vehicle added!";
        } else {
            return `Sorry, we're full.`;
        }
    }
}

//================================================================
//DOM Manupulation Functions

//================================================================
function main() {
    //Main function called when the page is loaded on the browser
}

//================================================================

document.addEventListener("DOMContentLoaded", main);
