import {randomRange} from "~app";

let stopSim: boolean = false;

class State
{
    //Example of AI behaviour

    //Track health of AI
    ai: CharacterAI = new CharacterAI();

    //Function to overrides
    move()
    {
        console.log("No state");
    }

    //Check to see if AI died
    checkDeath()
    {
        if (this.ai.health <= 0) {

            console.log("AI died!");

            //Stopping the simulation
            stopSim = true;
        }
    }

    //Check to see if AI got attacked
    gotAttacked(hitRate: number)
    {
        //Get random number
        let rand: number = randomRange(0, 100);

        //If random number is lower than given hit rate then AI loses health
        if (rand < hitRate) {
            this.ai.health -= 1;
            console.log("AI got hit by player! HP: " + this.ai.health);

            this.checkDeath();
        }
        //If not then don't lose any health
        else
        {
            console.log("Player missed AI! HP: " + this.ai.health);
        }
    }
}

class ChaseState extends State
{
    move()
    {
        //Showing that the AI chases the player
        console.log("Chasing player!");

        //Has 70 percent chance to get hit while being chased
        this.gotAttacked(70);
    }
}

class RunAwayState extends State
{
    move()
    {
        //Showing that the AI runs away from the player
        console.log("Running away from player!");

        //Has 40 percent chance to get hit while running away
        this.gotAttacked(40);
    }
}

class HealingState extends State
{
    move()
    {
        //Showing that the AI chases the player
        this.ai.health += 2;
        console.log("Healing up hp: " + this.ai.health);

        //Has 80 percent chance to get hit while healing up
        this.gotAttacked(80);        
    }
}

class CharacterAI
{
    health: number = 5;
}

//Create states
let chaseState = new ChaseState();
let runState = new RunAwayState();
let healState = new HealingState();

//Default state is chase
let state: State = chaseState;

//Counting how long the AI is running
let runCount: number = 0;

//Uncomment to test out the example
//stateExample();

function stateExample()
{
    //Check every 3 seconds
    setTimeout(function() {

        if (stopSim) {
            return;
        }

        //Do action based on state
        state.move();

        //If AI is chasing and health is lower than 3 then change to the run state
        if (state == chaseState && state.ai.health < 3) {
            runState.ai = state.ai;
            state = runState;
        }
        //If AI is running away and he ran 3 times then change to the healing state
        else if (state == runState) {
            runCount++;

            if (runCount >= 3) {
                runCount = 0;
                healState.ai = state.ai;
                state = healState;
            }
        }
        //If AI is healing and health is higher or equals to 5 then change to the chase state
        else if (state == healState && state.ai.health >= 5) {
            chaseState.ai = state.ai;
            state = chaseState;
        }

        //Restart the function again
        stateExample();
    }, 3000);
}