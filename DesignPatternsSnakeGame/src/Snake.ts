import { Graphics, Texture } from "pixi.js";
import { gridScale, container, canvas, food, scoreElement, bestScoreElement, snakeHeadSprite, snakeTailSprite, showGameOver, turnSfx, pointSfx } from "~app";
import { Vector2 } from "./Vector2";

export class Snake {
    
    body: Vector2[];
    xSpeed = 0;
    ySpeed = 0;
    score: number = 0;
    eatSprite: number = 0;
    bestScore: number = 0;

    grow: boolean = false;
    waitForMove: boolean = false;
    drawnOnce: boolean = false;

    tailSquares: PIXI.Graphics;

    constructor(x: number, y:number)
    {
        this.body = [];
        this.body[0] = new Vector2(x,y);

        this.tailSquares = new Graphics();
    }    

    update() {
        let head = new Vector2(this.body[0].x, this.body[0].y);
        head.add(this.xSpeed * gridScale, this.ySpeed * gridScale);

        //Add new pos
        this.body.unshift(head);

        //Remove old tail when not growing
        if (!this.grow) {
            this.body.pop();
        }

        snakeHeadSprite.position.x = head.x;
        snakeHeadSprite.position.y = head.y;

        this.grow = false;       
        this.waitForMove = false;
    }

    show()
    {
        let displaySprite = 0;

        if (this.xSpeed == 1) {
            displaySprite = 1;
        }
        else if (this.xSpeed == -1) {
            displaySprite = 3;
        }
        else if (this.ySpeed == 1) {
            displaySprite = 2;
        }

        snakeHeadSprite.position.x = this.body[0].x;
        snakeHeadSprite.position.y = this.body[0].y;

        this.drawSpriteFromSpriteSheet(snakeHeadSprite, displaySprite, this.eatSprite);

        if (this.body.length <= 1) {
            return;
        }

        if (this.drawnOnce) {
            container.removeChild(this.tailSquares);
        }        

        this.tailSquares = new Graphics();

        this.tailSquares.beginFill(0x5076F9, 1);

        for (let i = 1; i < this.body.length - 1; i++) {
            this.tailSquares.drawRect(this.body[i].x, this.body[i].y, gridScale, gridScale);        
        }       

        this.tailSquares.endFill();        

        container.addChild(this.tailSquares);        

        this.drawnOnce = true;

        let prevLastBody = this.body.length - 2;
        let lastBody = this.body.length - 1;

        let xDiff = this.body[prevLastBody].x - this.body[lastBody].x;
        let yDiff = this.body[prevLastBody].y - this.body[lastBody].y;

        displaySprite = 0;

        if (xDiff >= 1) {
            displaySprite = 1;
        }
        else if (xDiff <= -1) {
            displaySprite = 3;
        }
        else if (yDiff >= 1) {
            displaySprite = 2;
        }

        snakeTailSprite.visible = true;
        snakeTailSprite.position.x = this.body[lastBody].x;
        snakeTailSprite.position.y = this.body[lastBody].y;
        
        this.drawSpriteFromSpriteSheet(snakeTailSprite, displaySprite, 0);
    }

    drawSpriteFromSpriteSheet(sprite: PIXI.Sprite, spriteIndex: number, spriteIndexY: number)
    {
        let savedTexture = sprite.texture.baseTexture;
        sprite.texture = new Texture(savedTexture, new PIXI.Rectangle(spriteIndex * gridScale, spriteIndexY * gridScale, gridScale, gridScale))
        sprite.texture.updateUvs();
    }

    checkCollisionFood()
    {
        let head = this.body[0];

        let distance = head.distance(food.pos);

        if (distance <= 10) {
            food.randomLocation();

            this.grow = true;
            this.score++;

            pointSfx.play();

            if (this.score > this.bestScore) {
                this.bestScore = this.score;
            }

            scoreElement.innerHTML = "Score: " + this.score;
            bestScoreElement.innerHTML = "Best Score: " + this.bestScore;
            return;
        }
        else if (distance <= 80) {
            this.eatSprite = 1;
            return;
        }

        this.eatSprite = 0;
    }

    checkWallCollision()
    {
        let head = this.body[0];

        if (head.x > canvas.width - gridScale) {
            head.x = canvas.width - gridScale;
            showGameOver();
        }        
        else if (head.x < 0) {
            head.x = 0;
            showGameOver();
        }
        else if (head.y < 0) {
            head.y = 0;
            showGameOver();
        }
        else if (head.y > canvas.height - gridScale) {
            head.y = canvas.height - gridScale;
            showGameOver();
        }
    }

    checkBodyCollision()
    {
        let head = this.body[0];

        for (let i = 1; i < this.body.length; i++) {
            if (head.distance(this.body[i]) < 5) {
                showGameOver();
            }
        }
    }

    changeDirection(x: number, y:number)
    {
        if (this.waitForMove) {
            return;
        }

        if (Math.abs(this.xSpeed) != Math.abs(x)) {
            this.xSpeed = x;
            turnSfx.play();
            this.waitForMove = true;
        }
        
        if (Math.abs(this.ySpeed) != Math.abs(y)) {
            this.ySpeed = y;
            turnSfx.play();
            this.waitForMove = true;
        }
    }
}