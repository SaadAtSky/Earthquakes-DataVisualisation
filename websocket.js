//Open connection
let connection = new WebSocket("wss://etjk1s1k10.execute-api.us-east-1.amazonaws.com/prod");

//Log connected response
connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
    getFrequencies()
    getSentiment()
    getPredictions()
};

//Output messages from the server
connection.onmessage = function (msg) {
    // build frequency array based on returned frequencies
    // either build the whole array from 1960-2022 or ....
    console.log(msg)
    let numberOfRowsOfEarthquakeData = 520
    let numberOfRowsOfTextualData = 600 //or 874
    if(JSON.parse(msg.data).Count==numberOfRowsOfEarthquakeData){
        console.log("Earthquake Data recieved.");
        earthquakesData = JSON.parse(msg.data).Items
        getMaximumFrequency()
        // buildCurrentYearDataArray()
        // updateTransparency()
        // plot()
    }
    else if(JSON.parse(msg.data).Count==numberOfRowsOfTextualData){
        console.log("Textual Data recieved.");
        sentimentData = JSON.parse(msg.data).Items
        buildSentimentGraph()
    }
    else if(JSON.parse(msg.data).Count==5){
        console.log("Predictions Data recieved.");
        predictionsData = JSON.parse(msg.data).Items
    }
    // else if we get predictions data back, we build predictions array

}

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

//Send message to server
function getFrequencies() {

    //Create message to be sent to server
    let msgObject = {
        action: "getEarthquakesData",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}
//Send message to server
function getSentiment() {

    //Create message to be sent to server
    let msgObject = {
        action: "getSentiment",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}
//Send message to server
function getPredictions() {

    //Create message to be sent to server
    let msgObject = {
        action: "getPredictions",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}

