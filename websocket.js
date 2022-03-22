//Open connection
let connection = new WebSocket("wss://etjk1s1k10.execute-api.us-east-1.amazonaws.com/prod");

//Log connected response
connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
    // getFrequencies()
    getSentiment()
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
        // console.log(sentimentData[0].Timestamp)
        // console.log(sentimentData[0].Sentiment.Sentiment)
        // console.log(sentimentData[0].Sentiment.SentimentScore.Positive)
        // console.log(sentimentData[0].Sentiment.SentimentScore.Negative)
        // console.log(sentimentData[0].Sentiment.SentimentScore.Mixed)
        // console.log(sentimentData[0].Sentiment.SentimentScore.Neutral)
        buildSentimentGraph()
    }

}

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

//Send message to server
function getFrequencies() {
    let msgText = "date"

    //Create message to be sent to server
    let msgObject = {
        action: "getEarthquakesData",//Used for routing in API Gateway
        data: msgText
    };

    //Send message
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}
//Send message to server
function getSentiment() {
    let msgText = "date"

    //Create message to be sent to server
    let msgObject = {
        action: "getSentiment",//Used for routing in API Gateway
        data: msgText
    };

    //Send message
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}

