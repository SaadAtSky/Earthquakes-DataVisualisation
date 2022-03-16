namespace ScanDemo {

    let AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();

    /* A simple scan only requires the table name */
    let params = {
        TableName: "Earthquakes",
        Limit : 2
    };

    // /* Filters out items whose price is less than 1 */
    // let params = {
    //     TableName: "Crypto",
    //     FilterExpression : 'Price > :pr',
    //     ExpressionAttributeValues : {
    //         ':pr' : 1000
    //     }
    // };

    //Scan table to retrieve all data
    async function scanTable() {
        try{
            let result = await documentClient.scan(params).promise();
            console.log("Scan results: ");
            let itemsArray = result.Items
            console.log(itemsArray[0].Region);
        }
        catch(err){
            console.error("Scan Error:", JSON.stringify(err))
        }
    }
    scanTable();

}

