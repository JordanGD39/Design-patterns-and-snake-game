class Singleton
{
    //Static singleton so that every class can call it
    static instance: Singleton;

    //Constructor can't retun null so a static function wil create the new singleton
    static createSingleton()
    {
        //If singleton instance is not yet defined then a new singleton will fill it
        if (!Singleton.instance) {

            let newSingletonInstance = new Singleton();

            Singleton.instance = newSingletonInstance;
            return newSingletonInstance;
        }
        //If singleton instance is already filled then retun null
        else
        {
            return null;
        }
    }
}

//Uncomment this function to start the example!
//showExample();

let singleton;

function showExample()
{
    //Try the first time and that will succeed in creating a singleton
    singleton = Singleton.createSingleton();

    console.log("First attempt: " + singleton);

    //Second attempt will fail, because instance is already defined
    let failedSingledton = Singleton.createSingleton();

    console.log("Second attempt: " + failedSingledton);
}