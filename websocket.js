//Open connection
let connection = new WebSocket("wss://etjk1s1k10.execute-api.us-east-1.amazonaws.com/prod");

//Log connected response
connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
    getFrequencies()
};

//Output messages from the server
connection.onmessage = function (msg) {
    // build frequency array based on returned frequencies
    // either build the whole array from 1960-2022 or ....
    earthquakesData = JSON.parse(msg.data).Items
    console.log("Message received.");
    // console.log(earthquakesData[0].Frequency);
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
        action: "sendMessage",//Used for routing in API Gateway
        data: msgText
    };

    //Send message
    connection.send(JSON.stringify(msgObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(msgObject));
}
