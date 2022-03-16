"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var QueryDemo;
(function (QueryDemo) {
    let AWS = require("aws-sdk");
    //Set region
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });
    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();
    /* Retrieve all items with specified currency */
    // let params = {
    //     TableName: "Crypto",
    //     KeyConditionExpression: "Currency = :curr",
    //     ExpressionAttributeValues: {
    //         ":curr" : "tron"
    //     }
    // };
    /* Retrieve all items with specified time
    *   THIS QUERY FAILS BECAUSE TIME IS A RESERVED KEYWORD */
    // let params = {
    //     TableName: "Crypto",
    //     KeyConditionExpression: "Time = :ts",
    //     ExpressionAttributeValues: {
    //         ":ts" : 1643043872931
    //     }
    // };
    /* Retrieve all items with specified time.
    *  THIS QUERY FAILS BECAUSE WE HAVE NOT SPECIFIED THE CURRENCY.
    *   NEED AN INDEX. */
    // let params = {
    //     TableName: "Crypto",
    //     KeyConditionExpression: "#tm = :ts",
    //     ExpressionAttributeValues: {
    //         ":ts" : 1643043872931
    //     },
    //     ExpressionAttributeNames: {"#tm" :"Time"}
    // };
    // /* Use index to retrieve all items with specified Time */
    // let params = {
    //     TableName: "Crypto",
    //     IndexName: "Time-Currency-index",
    //     KeyConditionExpression: "#tm = :ts",
    //     ExpressionAttributeValues: {
    //         ":ts" : 1643043872931
    //     },
    //     ExpressionAttributeNames: {"#tm" :"Time"}
    // };
    /* Use expression to retrieve currencies with timestamp
        greater than specified value */
    // let params = {
    //     TableName: "Crypto",
    //     KeyConditionExpression: "Currency = :curr AND #tm > :ts",
    //     ExpressionAttributeValues: {
    //         ":curr" : "bitcoin",
    //         ":ts" : 1643043713295
    //     },
    //     ExpressionAttributeNames: {"#tm" :"Time"}
    // };
    /* Retrieves bitcoin items with price greater than 3800
        Price is not an indexed field. */
    // let params = {
    //     TableName: "Crypto",
    //     KeyConditionExpression: "Currency = :curr",
    //     FilterExpression: "Price > :p",
    //     ExpressionAttributeValues: {
    //         ":curr" : "bitcoin",
    //         ":p" : 3800
    //     }
    // };
    /* Retrieves just the prices of the bitcoin items */
    // let params = {
    //     TableName: "Crypto",
    //     KeyConditionExpression: "Currency = :curr",
    //     ProjectionExpression: "Price",
    //     ExpressionAttributeValues: {
    //         ":curr" : "bitcoin",
    //     }
    // };
    // /* Retrieve the most recent five bitcoin prices*/
    let params = {
        TableName: "Crypto",
        Limit: 5,
        ScanIndexForward: true,
        KeyConditionExpression: "Currency = :curr",
        ExpressionAttributeValues: {
            ":curr": "tron"
        }
    };
    //Runs the query with the parameters
    function runQuery() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield documentClient.query(params).promise();
                console.log(result);
            }
            catch (er) {
                console.log("error: " + JSON.stringify(er));
            }
        });
    }
    runQuery();
})(QueryDemo || (QueryDemo = {}));
