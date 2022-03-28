//Import external library with websocket functions
let ws = require('websocket');
let AWS = require('aws-sdk')
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Hard coded domain name and stage - use when pushing messages from server to client
let domainName = "etjk1s1k10.execute-api.us-east-1.amazonaws.com/";
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
        console.log(event)
        
        const msg = JSON.stringify(result);
        console.log("Message: " + msg);

        //Respond to change in DB by sending data in DB to all connected clients
        try {
            if(event.Records[0].eventName==="MODIFY" || event.Records[0].eventName==="INSERT"){
            let sendMsgPromises = await ws.getSendMessagePromises(msg, domainName, stage);

            //Execute promises
            await Promise.all(sendMsgPromises);
            }
        }
        //Get promises to send message to only the connected client
        catch(err){
            //Create parameters for API Gateway
            let apiMsg = {
                ConnectionId: event.requestContext.connectionId,
                Data: msg,
            };
            //Create API Gateway management class.
            const apigwManagementApi = new AWS.ApiGatewayManagementApi({
            endpoint: domainName + '/' + stage});
            //Wait for API Gateway to execute and log result
            await apigwManagementApi.postToConnection(apiMsg).promise();
            console.log("Message '" + msg + "' sent to: " + event.requestContext.connectionId);
        }
    }
    catch(err){
        return { statusCode: 500, body: "Error: " + JSON.stringify(err) };
    }
};