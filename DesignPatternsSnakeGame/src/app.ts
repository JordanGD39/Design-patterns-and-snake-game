import { Snake } from "./Snake";
import { Vector2 } from "./Vector2";
import { Food } from "./Food";
import * as PIXI from 'pixi.js';

export let canvas: HTMLCanvasElement;
export let scoreElement: HTMLElement;
export let bestScoreElement: HTMLElement;
export let ctx: CanvasRenderingContext2D;
export let appleSprite: PIXI.Sprite;
export let snakeHeadSprite: PIXI.Sprite;
export let snakeTailSprite: PIXI.Sprite;

let app: PIXI.Application;
export const container = new PIXI.Container();

export let turnSfx: HTMLAudioElement;
let deathSfx: HTMLAudioElement;
export let pointSfx: HTMLAudioElement;
let music: HTMLAudioElement;

export let player: Snake = new Snake(0,0);

export let food: Food;

export let gridScale = 40;

export let col = 0;
export let rows = 0;
let drawUpdate: boolean = true;
let startedGame: boolean = false;

let gameOverText: PIXI.Text;
let pressEnterText: PIXI.Text;
let bg: PIXI.Graphics;

export function showGameOver()
{
    drawUpdate = false;    
    deathSfx.play();

    //Removing and adding is done to put the object on top
    container.removeChild(bg);
    container.addChild(bg);

    bg.visible = true;

    gameOverText.visible = true;
    container.removeChild(gameOverText);
    container.addChild(gameOverText);

    pressEnterText.visible = true;
    container.removeChild(pressEnterText);
    container.addChild(pressEnterText);

    app.render();
}

function draw()
{
    setTimeout(function() {

        if (!drawUpdate) {
            return;
        }

        requestAnimationFrame(draw);

        //Update and render player body
        player.update();
        player.checkCollisionFood();
        player.show();

        app.render();

        //Check collision
        player.checkBodyCollision();
        player.checkWallCollision();
        
    }, 120);
}

export function randomRange(min: number, max: number)
{
    return Math.random() * max + min;
}

function keyboardInput(event: KeyboardEvent) {

    switch(event.key)
    {
        case "ArrowUp":
            if (drawUpdate || !startedGame) {
                player.changeDirection(0, -1);

                startGameOnMove();
            }
            
        break;
        case "ArrowDown":
            if (drawUpdate|| !startedGame) {
                player.changeDirection(0, 1);

                startGameOnMove();
            }
           
        break;
        case "ArrowLeft":
            if (drawUpdate || !startedGame) {
                player.changeDirection(-1, 0);

                startGameOnMove();
            }
            
        break;
        case "ArrowRight":
            if (drawUpdate|| !startedGame) {
                player.changeDirection(1, 0);              
                
                startGameOnMove();
            }
            
        break;
        case "Enter":
            if (!drawUpdate && startedGame) {
                showStartGame();
            }
            break;
    }    
}

let gameText: PIXI.Text;
let pressText: PIXI.Text;

function startGameOnMove()
{
    startedGame = true;

    if (!drawUpdate) {
        drawUpdate = true;
        draw();
        bg.visible = false;
        gameText.visible = false;
        pressText.visible = false;

        music.play();
    }
}

window.onload = () =>
{
    document.addEventListener('keydown', keyboardInput);

    canvas = <HTMLCanvasElement>document.getElementById('canvas');

    app = new PIXI.Application({ backgroundColor: 0xA7D948, view: canvas, width: 640, antialias: false, height: 480, forceCanvas: true, clearBeforeRender: true });
    app.stage.addChild(container);

    let snakeHeadImage = <HTMLImageElement>document.getElementById('headImage');
    let snakeTailImage = <HTMLImageElement>document.getElementById('tailImage');
    let appleImage = <HTMLImageElement>document.getElementById('appleImage');

    appleSprite = PIXI.Sprite.from(appleImage.src);
    snakeHeadSprite = PIXI.Sprite.from(snakeHeadImage.src);
    snakeTailSprite = PIXI.Sprite.from(snakeTailImage.src);

    appleSprite.anchor.set(0);

    scoreElement = <HTMLCanvasElement>document.getElementById('score');
    bestScoreElement = <HTMLCanvasElement>document.getElementById('bestScore');
    turnSfx = <HTMLAudioElement>document.getElementById('turnSfx');
    deathSfx = <HTMLAudioElement>document.getElementById('deathSfx');
    pointSfx = <HTMLAudioElement>document.getElementById('pointSfx');
    music = <HTMLAudioElement>document.getElementById('music');
    music.loop = true;
    music.volume = 0.8;

    col = Math.floor(canvas.width / gridScale);
    rows = Math.floor(canvas.height / gridScale);
    
    let tiles = new PIXI.Graphics();

    for(let i=0; i < rows; i++) {
        for(let j=0; j < col; j++) {
            tiles.beginFill(((i+j)%2==0) ? 0xA7D948 : 0x8ECC39, 1);

            let xOffset = j * gridScale;
            let yOffset = i * gridScale;
            
            tiles.drawRect(xOffset, yOffset, gridScale, gridScale);
            tiles.endFill();
        }
    }    

    container.addChild(tiles);

    container.addChild(appleSprite);
    container.addChild(snakeHeadSprite);

    snakeTailSprite.visible = false;

    container.addChild(snakeTailSprite);
    
    bg = new PIXI.Graphics();

    bg.beginFill(0x000000, 0.5);
    bg.drawRect(0, 0, canvas.width, canvas.height);
    bg.endFill();
    bg.visible = false;

    container.addChild(bg);

    gameText = new PIXI.Text("Retro Snake", {fontFamily: "monospace", fontSize: 64, fill: 0xFFFFFF, align: "center"})
    gameText.anchor.set(0.5);
    gameText.position.set(canvas.width / 2, 200);
    container.addChild(gameText);

    pressText = new PIXI.Text("Press any Arrow key to play", {fontFamily: "monospace", fontSize: 24, fill: 0xFFFFFF, align: "center"})
    pressText.anchor.set(0.5);
    pressText.position.set(canvas.width / 2, 300);
    container.addChild(pressText);

    gameOverText = new PIXI.Text("Game over", {fontFamily: "monospace", fontSize: 64, fill: 0xFFFFFF, align: "center"})
    gameOverText.anchor.set(0.5);
    gameOverText.position.set(canvas.width / 2, 200);
    gameOverText.visible = false;
    container.addChild(gameOverText);

    pressEnterText = new PIXI.Text("Press Enter to restart", {fontFamily: "monospace", fontSize: 32, fill: 0xFFFFFF, align: "center"})
    pressEnterText.anchor.set(0.5);
    pressEnterText.position.set(canvas.width / 2, 300);
    pressEnterText.visible = false;
    container.addChild(pressEnterText);

    showStartGame();
}

export function showStartGame()
{
    startedGame = false;
    drawUpdate = false;

    player.xSpeed = 0;
    player.ySpeed = 0;
    player.score = 0;
    scoreElement.innerHTML = "Score: 0";
    player.body = [];    
    //food.show();

    player.body[0] = new Vector2(Math.floor(col / 4), Math.floor(rows / 2));
    player.body[0].multiply(gridScale);

    let head = new Vector2(player.body[0].x, player.body[0].y - gridScale);
    player.body.unshift(head);

    player.show();    

    food = new Food();

    bg.visible = true;
    gameOverText.visible = false;
    pressEnterText.visible = false;

    gameText.visible = true;
    container.removeChild(gameText);
    container.addChild(gameText);

    pressText.visible = true;
    container.removeChild(pressText);
    container.addChild(pressText);
}