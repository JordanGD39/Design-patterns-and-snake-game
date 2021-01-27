import { Vector2 } from "./Vector2";
import { gridScale, randomRange, col, rows, appleSprite, player} from "~app";

export class Food {
    pos: Vector2 = new Vector2(0,0);
    triedCount: number = 0;

    constructor()
    {
        this.randomLocation();
    }

    randomLocation()
    {        
        this.pos = new Vector2(Math.floor(randomRange(1, col - 2)), Math.floor(randomRange(1, rows - 2)));
        this.pos.multiply(gridScale);

        appleSprite.position.x = this.pos.x;
        appleSprite.position.y = this.pos.y;

        if (this.triedCount > 0) {
            console.log("Tried to spawn: " + this.triedCount + " many times");
        }        

        if (this.triedCount > 100) {
            this.triedCount = 0;
            return;
        }

        for (let i = 0; i < player.body.length; i++) {
            const part = player.body[i];
            
            if (this.pos.distance(part) < 10) {
                this.randomLocation();
                this.triedCount++;
                return;
            }
        }

        this.triedCount = 0;
    }

    /*show()
    {
        ctx.drawImage(appleImage, this.pos.x, this.pos.y);
    }*/
}
