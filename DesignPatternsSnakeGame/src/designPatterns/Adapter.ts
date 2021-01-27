class Circle
{
    radius = 4;

    constructor(rad: number)
    {
        this.radius = rad;
    }

    fits(circle: Circle)
    {
        return circle.radius < this.radius;
    }
}

class Rectangle
{
    size = 4;

    constructor(givenSize: number)
    {
        this.size = givenSize;
    }
}

class Adapter
{
    //Change rectangle to new circle
    ChangeRectToCircle(rect: Rectangle)
    {
        return new Circle(rect.size);
    }
}

function example()
{
    //Make circles
    let circle = new Circle(10);
    let smallerCircle = new Circle(5);
    let biggerCircle = new Circle(15);

    //Check if circle fits
    circle.fits(smallerCircle); //returns true
    circle.fits(biggerCircle) //returns false

    //Create rectangle
    let rect = new Rectangle(5);

    //Check if rectangle fits
    //Commented to compile
    //circle.fits(rect); //Incompatible so it gives an error
    
    let adapter = new Adapter();

    //Make a circle out of the square
    let convertedRect = adapter.ChangeRectToCircle(rect);

    //Check if converted rectangle fits
    circle.fits(convertedRect); //Compatible
}