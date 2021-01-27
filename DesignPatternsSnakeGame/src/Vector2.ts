export class Vector2
{
    x: number = 0;
    y: number = 0;

    constructor(aX:number, aY:number)
    {
        this.x = aX;
        this.y = aY;
    }

    add(aX:number, aY:number = aX)
    {
        this.x += aX
        this.y += aY;
    }

    multiply(numb: number)
    {
        this.x *= numb;
        this.y *= numb;
    }

    distance(b:Vector2)
    {
        return new Vector2(this.x - b.x, this.y - b.y).magnitude;
    }

    get magnitude()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}