//Open connection
let connection = new WebSocket("wss://etjk1s1k10.execute-api.us-east-1.amazonaws.com/prod");

//Log connected response
connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
    // upon connection witht he websocket, get the numerical and textual data
    getFrequencies()
    getSentiment()
    getFrequencyPredictions()
};

// Upon response from the Websockets to the requests, store the returned numerical 
// and textual data accordingly and call the function to plot graphs
connection.onmessage = function (msg) {
    let numberOfRowsOfEarthquakeData = 520
    let numberOfRowsOfTextualData = 600

    if (JSON.parse(msg.data).Count == numberOfRowsOfEarthquakeData) {
        console.log("Earthquake Data recieved.");
        earthquakesData = JSON.parse(msg.data).Items
        getMaximumFrequencyAndMagnitude()
        buildCurrentYearDataArray()
        updateTransparency()
        plot()
    }
    else if (JSON.parse(msg.data).Count == numberOfRowsOfTextualData) {
        console.log("Textual Data recieved.");
        sentimentData = JSON.parse(msg.data).Items
        buildSentimentGraph()
    }
    else if (JSON.parse(msg.data).Count == numberOfRegions) {
        if (predictionsDataFreq.length == 0) {
            console.log("Frequency Predictions Data recieved.");
            predictionsDataFreq = JSON.parse(msg.data).Items
            getMagnitudePredictions()
        }
        else {
            console.log("Magnitude Predictions Data recieved.");
            predictionsDataMag = JSON.parse(msg.data).Items
        }
    }
}

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

// Request Earthquakes data from the WebSocket
function getFrequencies() {

    //Create request to be sent to server
    let requestObject = {
        action: "getEarthquakesData",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(requestObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(requestObject));
}
// Request Sentiment data from the WebSocket
function getSentiment() {

    //Create request to be sent to server
    let requestObject = {
        action: "getSentiment",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(requestObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(requestObject));
}
// Request Earthquakes Frequency Predictions data from the WebSocket
function getFrequencyPredictions() {

    //Create request to be sent to server
    let requestObject = {
        action: "getPredictions",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(requestObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(requestObject));
}
// Request Earthquakes Magnitude Predictions data from the WebSocket
function getMagnitudePredictions() {

    //Create request to be sent to server
    let requestObject = {
        action: "getMagnitudePredictions",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(requestObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(requestObject));
}

