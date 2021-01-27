import { Vector2 } from "~Vector2";
import { Car} from "./Builder";

class Factory
{
    //Builld car function
    buildCar()
    {
        let car = new Car();
        car.drive();
        return car;
    }

    //Build boat function
    buildBoat()
    {
        let boat = new Boat();
        boat.sail();
        return boat;
    }
}

class Boat
{
    constructor()
    {
        console.log("Boat has been made!");
    }

    //When building boat it already sails
    sail()
    {
        console.log("Boat is sailing")
    }

    destination: Vector2 = new Vector2(0,0);

    //Change destination
    changeDestination(pos: Vector2)
    {
        this.destination = pos;
        console.log("Boat destination is: x: " + this.destination.x + " y: " + this.destination.y);
    }
}

let factory: Factory;

//Uncomment this function to start the example!
//startExample();

function startExample()
{
    //Create factory
    factory = new Factory();

    //Create a car using the factory
    let car = factory.buildCar();

    //Create boat from factory
    let boat = factory.buildBoat();

    //Change car color
    car.changeColor("blue");

    //Change boat destination
    boat.changeDestination(new Vector2(100, 100));
}