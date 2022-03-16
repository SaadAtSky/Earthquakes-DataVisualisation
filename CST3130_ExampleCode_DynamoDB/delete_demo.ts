namespace DeleteDemo {

    let AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();

    async function deleteItem(){
        //Table name and data for table
        let params = {
            TableName: "Crypto",
            Key: {
                "Currency": "BTC",
                "Time": 12345
            }
        }
        //Delete data from DynamoDB and handle errors
        try {
            let result = await documentClient.delete(params).promise();
            console.log("Data deleted successfully: " + JSON.stringify(result));
        } catch (err) {
            console.error("ERROR deleting data: " + JSON.stringify(err));
        }
    }
    deleteItem();


}

