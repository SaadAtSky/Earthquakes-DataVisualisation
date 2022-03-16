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
var ScanDemo;
(function (ScanDemo) {
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
        Limit: 2
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
    function scanTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield documentClient.scan(params).promise();
                console.log("Scan results: ");
                let itemsArray = result.Items;
                console.log(itemsArray[0].Region);
            }
            catch (err) {
                console.error("Scan Error:", JSON.stringify(err));
            }
        });
    }
    scanTable();
})(ScanDemo || (ScanDemo = {}));
