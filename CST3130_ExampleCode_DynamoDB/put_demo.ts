namespace PutDemo {
    //Link to AWS-SDK
    const AWS = require("aws-sdk");

    //Tell AWS about region
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    async function putData() {
        //Create new DocumentClient
        let documentClient = new AWS.DynamoDB.DocumentClient();

        //Table name and data for table
        let params = {
            TableName: "Crypto",
            Item: {
                "Currency": "Dodgecoin",
                "Time": 2222,
                "Price": 7777
            }
        }

        //Store data in DynamoDB and handle errors
        try {
            let result = await documentClient.put(params).promise();
            console.log("Data uploaded successfully: " + JSON.stringify(result));
        } catch (err) {
            console.error("ERROR uploading data: " + JSON.stringify(err));
        }
    }
    putData();
}

