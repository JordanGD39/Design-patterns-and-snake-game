class GamePublisher
{
    //Notification to send to people who subscribed
    notification: string = "My new game came out! Check out the game at the bottom of the e-mail!";
    
    //The people who subscribed
    subscribers: Person[] = [];
}

class Person
{
    //Inbox of the people
    inbox: string[] = [];
}

//Uncomment to test out the example
//observerExample();

function observerExample()
{
    //Creating people
    let person = new Person();
    let person1 = new Person();
    let person2 = new Person();
    let person3 = new Person();
    let person4 = new Person();

    //Creating game publisher
    let gamePublisher = new GamePublisher();

    //Put the people who want to subscribe in the subscribers list
    gamePublisher.subscribers.push(person, person1, person4);

    //Send notification to every subscriber
    for (let i = 0; i < gamePublisher.subscribers.length; i++) {
        const sub = gamePublisher.subscribers[i];
        
        sub.inbox.push(gamePublisher.notification);
    }

    //Show how many subscribed and the notification
    console.log(gamePublisher.subscribers.length + " people have received the message: \"" + gamePublisher.notification + "\" in their inbox!");
}