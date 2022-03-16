"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveData = void 0;
let AWS = require("aws-sdk");
//Configure AWS
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
//Create new DocumentClient
let documentClient = new AWS.DynamoDB.DocumentClient();
/* Function returns a Promise that will save the text with the specified id. */
function saveData(tweetId, tweetText) {
    //Table name and data for table
    let params = {
        TableName: "Twitter",
        Item: {
            id: tweetId,
            text: tweetText, //Text of tweet
        }
    };
    //Store data in DynamoDB and handle errors
    return new Promise((resolve, reject) => {
        documentClient.put(params, (err, data) => {
            if (err) {
                reject("Unable to add item: " + JSON.stringify(err));
            }
            else {
                resolve("Item added to table with id: " + tweetId);
            }
        });
    });
}
exports.saveData = saveData;
