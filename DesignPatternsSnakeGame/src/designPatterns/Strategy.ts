import { randomRange }  from "~app";

let gameStop: boolean = false;

class Strategy
{
    //This example show a AI party member that changes what he does every turn when getting a turn

    stats: Stats = new Stats("Player");

    //The strategy of the AI which we will override in other classes
    actionInTurn(enemy: Stats)
    {
        console.log("No strategy!");
    }

    //Showing name of enemy and player
    showAction(enemy: Stats)
    {
        console.log("Attacking " + enemy.name + " with " + this.stats.name);
    }

    //Show the damage in console
    showDamage(enemy:Stats, atk: number)
    {
        console.log(enemy.name + " received " + atk + " damage and " + enemy.name + " has " + enemy.hp + " health left!")

        if (enemy.hp < 0) {
            //Stopping further input from player
            gameStop = true;

            if (enemy.name != "Player") {
                console.log("You win!")
            }
            else
            {
                console.log("You lose!");
            }
        }
    }
}

class Stats
{
    constructor(givenName: string)
    {
        this.name = givenName;
    }

    //Name of character
    name: string = "Enemy";

    //HP of charachter
    hp: number = 50;

    //Normal attack always hits
    atk: number = 5;

    //Special attack has a 60 percent chance of hitting
    specialAtk: number = 8;
    specialHitRate: number = 60;
}

class HeadOnAttack extends Strategy
{
    actionInTurn(enemy: Stats)
    {
        //Showing name of enemy and player
        this.showAction(enemy);

        //Damage enemy with attack stat
        enemy.hp -= this.stats.atk;

        //Show Damage
        this.showDamage(enemy, this.stats.atk);
    }
}

class UseBestMoves extends Strategy
{
    actionInTurn(enemy: Stats)
    {
        console.log("Using special attack!");
        //Showing name of enemy and player
        this.showAction(enemy);

        let rand: number = randomRange(0, 100);

        if (rand < this.stats.specialHitRate) {
            //Damage enemy with attack stat
            enemy.hp -= this.stats.atk;

            //Show Damage
            this.showDamage(enemy, this.stats.atk);
        }
        else
        {
            //Player missed attack
            console.log(this.stats.name + " missed attack!");
        }        
    }
}

class Defending extends Strategy
{
    actionInTurn(enemy: Stats)
    {
        //Showing name of enemy and player
        console.log(this.stats.name + " defending from " + enemy.name)

        //Halving attack, because player is defending the attack
        let atk: number = enemy.atk/2;

        //Enemy attack player (only when player is defending)
        this.stats.hp -= atk;      

        this.showDamage(this.stats, atk)
    }
}

//Uncomment this function to start the example!
//startExample();

let strategy: Strategy;
let enemy: Stats;

//Showing the example in the console and you can test it out!
function startExample()
{
    //Default strategy strategy class contains the stats of the player
    strategy = new HeadOnAttack();

    //Create new enemy
    enemy = new Stats("Enemy");

    //Start the update call
    update();
}

let answer = "Head on Attack";

function update()
{   
    if (gameStop) {
        return;
    }

    //Get answer from player
    let answerMaybe = prompt('You can choose from: Head on Attack, Use best moves and Defending. Type the name of the strategy:', answer);

    if (!answerMaybe) {
        console.log("Answer is null!");

        return;
    }

    //To lower case so that the user can ignore uppercase
    answer = answerMaybe.toLowerCase();

    console.log("Input: " + answer);

    //Check the input and make strategy the input
    switch (answer) {
        case "head on attack":
            strategy = new HeadOnAttack();
            break;
    
        case "use best moves":
            strategy = new UseBestMoves();
        break;
        case "defending":
            strategy = new Defending();
        break;
    }

    //Do action
    strategy.actionInTurn(enemy);

    update();
}