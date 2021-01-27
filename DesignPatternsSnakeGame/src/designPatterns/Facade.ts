class ShopProduct
{
    name: string = "";
    cost: number = 5;

    constructor(givenName: string, givenCost: number)
    {
        this.name = givenName;
        this.cost = givenCost
    }
}

class ShopBuilding
{
    cost: number = 2000;
}

class Shop
{
    building: ShopBuilding = new ShopBuilding();
    products: any = [];
    name: string = "";
}

class ShopMaker
{
    shop: Shop = new Shop();

    //Shop maker lets you give a budget and name and the rest is bought for you
    makeShop(budget: number, givenName: string)
    {
        //Showing starting budget to player
        console.log("Starting budget: " + budget);

        //Giving the shop a name
        this.shop.name = givenName;
        
        //Create a shop building
        this.shop.building = new ShopBuilding();
        
        //Use budget to buy building
        budget -= this.shop.building.cost;
        console.log("Bought building budget left: " + budget);

        //Make cola bottle
        let bottle = new ShopProduct("Cola bottle", 2);
        
        //Buy cola bottles until the budget is too low to buy anymore
        while(budget >= bottle.cost)
        {
            budget -= bottle.cost;
            
            //Add bought bottle to products in shop
            this.shop.products.push(bottle);
        }

        //Show how many where bought
        console.log("Bought " + this.shop.products.length + " " + bottle.name + "'s" + " remaining budget: " + budget);   
        
        return this.shop;
    }
}

let shop: Shop;
let budget = 5000;

//Uncomment this function to start the example!
//startExample();

//Showing the example in the console and you can test it out!
function startExample()
{
    //Make new shop maker
    let maker: ShopMaker = new ShopMaker();

    //Make shop with budget and name
    shop = maker.makeShop(budget, "Cola bottle shop");

    //Show the new shop to the player
    console.log("You have a new shop named: " + shop.name);
}