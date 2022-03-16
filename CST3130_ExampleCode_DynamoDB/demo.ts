const AWS = require("aws-sdk");

AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

//Create new DocumentClient
let docClient = new AWS.DynamoDB.DocumentClient();


async function storeData():Promise<void>{
    let params = {
        TableName: "CryptoData",
        Item: {
            "TimeStamp": 83723493274,
            "Currency": "BTC",
            "Price": 3232.32
        }
    };

    try {
        await docClient.put(params).promise();
    }
    catch(err){
        console.error(err);
    }
}

storeData();


