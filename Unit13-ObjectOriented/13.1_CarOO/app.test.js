/*
Jasmine Unit Testing
Title: Car Object-Oriented Programming Challenge
Author: Fabricio Fogaroli Ribeiro
Date: April 7, 2024
*/

describe("Section 1", function () {
    let vehicle, car;

    beforeEach(() => {
        vehicle = new Vehicle("Honda", "Monster Truck", 1999);
        car = new Car("Toyota", "Corolla", 2005)
    })


    //test for Vehicle class
    it('Class Vehicle Method honk - should return "Beep" when honk() is called', function () {
        expect(vehicle.honk()).toEqual("Beep.");
    });

    it("Class Vehicle Method toString - should return phase content when toString() is called.", function () {
        expect(vehicle.toString()).toEqual(
            "The vehicle is a Honda Monster Truck from 1999."
        );
    });

    it("Class Car- subclass of Vehicle with additional parameter numWheels set to 4", function () {
        expect(car.toString()).toEqual(
            "The vehicle is a Toyota Corolla from 2005."
        );
        expect(car.honk()).toEqual("Beep.");
        expect(car.numWheels).toEqual(4);
    });

    it("Class Motorcycle- subclass of Vehicle with additional method revEngine should return Vroom", function () {
        let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
        expect(myFirstMotorcycle.toString()).toEqual(
            "The vehicle is a Honda Nighthawk from 2000."
        );
        expect(myFirstMotorcycle.honk()).toEqual("Beep.");
        expect(myFirstMotorcycle.revEngine()).toEqual("VROOM!!!");
        expect(myFirstMotorcycle.numWheels).toEqual(2);
    });

    it("Class Garage- class to store Vehicle class object", function () {
        let garage = new Garage(2);
        expect(garage.vehicles).toEqual([]);
        expect(garage.add(new Car("Hyundai", "Elantra", 2015))).toEqual(
            "Vehicle added!"
        );
        expect(garage.vehicles.length).toEqual(1);
        expect(garage.add("Taco")).toEqual(
            "Only vehicles are allowed in here!"
        );
        expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2000))).toEqual(
            "Vehicle added!"
        );
        expect(garage.vehicles.length).toEqual(2);
        expect(garage.add(new Motorcycle("Honda", "Nighthawk", 2001))).toEqual(
            "Sorry, we're full."
        );
    });
});
