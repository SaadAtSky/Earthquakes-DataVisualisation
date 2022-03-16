namespace GetDemo {

    let AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();

    //Table name and data for table
    let params = {
        TableName: "Crypto",
        Key: {
            Time: 2222,
            Currency: "Dodgecoin"
        }
    };

    //Gets a single item
    async function getItem() {
        try{
            let result = await documentClient.get(params).promise();
            console.log("Successful get Item: ");
            console.log(result);
        }
        catch(err){
            console.error("Get Error:", JSON.stringify(err))
        }
    }
    getItem();

}


