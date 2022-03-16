namespace UpdateDemo {

    let AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();

    /* Updates a single item.*/
    let params = {
        TableName: "Crypto",
        Key: {
            Time: 1643043713292,
            Currency: "litecoin",
        },
        UpdateExpression: "SET Price = :pr",
        ExpressionAttributeValues : {
            ':pr' : 1000
        }
    };

    async function updateItem() {
        try{
            let result = await documentClient.update(params).promise();
            console.log("Successful update: ");
            console.log(result);
        }
        catch(err){
            console.error("Update Error:", JSON.stringify(err))
        }
    }
    updateItem();

}

