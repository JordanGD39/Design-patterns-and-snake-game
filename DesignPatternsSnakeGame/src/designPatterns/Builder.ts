let finished = false;

export class Car
{
    //All changeable variables
    engine: boolean = false;
    wheels: number = 0;
    doors: number = 0;
    automatic: boolean = false;
    color: string = "black";

    //Showing player that a car has been made
    constructor()
    {
        console.log("Car has been made!");
    }

    //Function to create an engine
    buildEngine()
    {
        console.log("Building engine...");

        console.log("Engine built!");
        this.engine = true;
    }

    //Used for the Factory pattern and when building car it already drives
    drive()
    {
        console.log("car is driving!");
    }

    //Function to build set amount by player of wheels
    buildWheels(num: number)
    {
        console.log("Building wheel(s)...")

        this.wheels = num;
        console.log("Wheel(s) built!");
    }

    buildDoors(num: number)
    {
        console.log("Building door(s)...")

        this.doors = num;
        console.log("Door(s) built!");
    }

    changeColor(givenColor: string)
    {
        console.log("Changing car color...")

        this.color = givenColor;
        console.log("Color changed to: " + givenColor);
    }

    //Change the type of car
    changeAutomatic(auto: boolean)
    {
        console.log("Changing car type...");

        let type: string = auto ? "automatic" : "manual";

        this.automatic = auto;
        console.log("Car type changed to " + type);        
    }

    finishCar()
    {
        //Show all the variables to player
        console.log("Your car: ");
        console.log("Has an engine: " + this.engine);
        console.log("Has " + this.wheels + " wheels");
        console.log("Has " + this.doors + " doors");
        console.log("Color: " + this.color);
        console.log("Automatic: " + this.automatic);

        //Stop player from changing the car again
        finished = true;
    }
}

let car: Car;

//Uncomment this function to start the example!
//startExample();

//Showing the example in the console and you can test it out!
function startExample()
{
    //Default strategy strategy class contains the stats of the player
    car = new Car();

    update();
}

//Default answer
let answer = "Build engine";

function update()
{
    //Stopping input form player
    if (finished) {
        return;
    }

    //Get answer from player
    let answerMaybe = prompt('You can choose to: Build engine, Build wheels, Build doors, Change color, Change car type and Finish car. Type your choice here:', answer);

    if (!answerMaybe) {
        console.log("Answer is null!");

        return;
    }

    //To lower case so that the user can ignore uppercase
    answer = answerMaybe.toLowerCase();

    console.log("Input: " + answer);

    //Check the input and make strategy the input
    switch (answer) {
        case "build engine":
            //Build the engine
            car.buildEngine();
            break;
    
        case "build wheels":
            //Player can input number
            answerMaybe = prompt("How many?", "1");

            if (!answerMaybe) {
                console.log("Answer is null!");        
                return;
            }

            //Change input to an number 
            car.buildWheels(parseInt(answerMaybe));

        break;
        case "build doors":
            //Player can input number
            answerMaybe = prompt("How many?", "1");

            if (!answerMaybe) {
                console.log("Answer is null!");        
                return;
            }

            //Change input to an number
            car.buildDoors(parseInt(answerMaybe));
        break;
        
        case "change color":
            //Player can input color
            answerMaybe = prompt("Color?", "red");

            if (!answerMaybe) {
                console.log("Answer is null!");        
                return;
            }
            //Change color of car
            car.changeColor(answerMaybe);
        break;

        case "change car type":
            //Player can type
            answerMaybe = prompt("Automatic?", "yes");

            if (!answerMaybe) {
                console.log("Answer is null!");        
                return;
            }

            if (answerMaybe == "yes") {
                car.changeAutomatic(true);
            }
            else if (answerMaybe == "no") {
                car.changeAutomatic(false);
            }
            else
            {
                console.log("Not valid answer!");
            }                
        break;

        case "finish car":
            car.finishCar();
            break;

            default:
                console.log("Not valid answer!");
                break;
    }

    //Restart function
    update();
}

