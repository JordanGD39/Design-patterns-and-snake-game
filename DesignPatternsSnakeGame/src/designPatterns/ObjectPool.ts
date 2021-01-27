import { Vector2 } from "~Vector2";
import { randomRange } from "~app";

//The object to spawn in pool
class Square
{
    //Position to show where the object is
    pos: Vector2 = new Vector2(0,0);

    constructor(givenPos: Vector2)
    {
        this.pos = givenPos;
    }

    move()
    {

        //Move the square
        this.pos.x += 10; 

        console.log("Square: " + indexUsed + " moved by to x: " + this.pos.x);

        //Make pos random again to reuse
        this.pos = new Vector2(randomRange(0, 100), randomRange(0, 100));

        //Use next square
        indexUsed++;

        //If all squares are used then use first square again
        if (indexUsed > pool.length - 1) {
            indexUsed = 0;
        }
    }
}

let pool: Square[] = [];
let indexUsed = 0;

//How many objects to spawn at start
let numberOfGeneratedObjects = 100

//How many squares to move
let squaresToMove = 250;

//Uncomment this function to start the example!
//startExample();

function startExample()
{
    //Spawn objects and put them in the pool
    for (let i = 0; i < numberOfGeneratedObjects; i++) {
        pool.push(new Square(new Vector2(randomRange(0, 100), randomRange(0, 100))));

        console.log(pool[i].pos);
    }

    //Move squares by given squares to move
    for (let i = 0; i < squaresToMove; i++) {
        pool[indexUsed].move();        
    }    
}
