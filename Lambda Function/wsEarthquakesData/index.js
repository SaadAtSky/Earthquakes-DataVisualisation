//Import external library with websocket functions
let ws = require('websocket');
let AWS = require('aws-sdk')
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Hard coded domain name and stage - use when pushing messages from server to client
let domainName = "wss://2vn1tu4oo8.execute-api.us-east-1.amazonaws.com";
let stage = "prod";

exports.handler = async (event) => {
    let documentClient = new AWS.DynamoDB.DocumentClient();
    try {
        //Get Message from event
        const params = {
            TableName: 'Earthquakes',
        };
        let result
        result = await documentClient.scan(params).promise();
        console.log("Scan results: ");
        // console.log(result);
        
        const msg = JSON.stringify(result);
        // const msg = JSON.parse(event.body).data;
        console.log("Message: " + msg);

        //Allocate domain name and stage dynamically
        domainName = event.requestContext.domainName;
        stage = event.requestContext.stage;
        console.log("Domain: " + domainName + " stage: " + stage);

        //Get promises to send messages to connected clients
        let sendMsgPromises = await ws.getSendMessagePromises(msg, domainName, stage);

        //Execute promises
        await Promise.all(sendMsgPromises);
    }
    catch(err){
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }

    //Success
    return { statusCode: 200, body: "Data sent successfully." };
};