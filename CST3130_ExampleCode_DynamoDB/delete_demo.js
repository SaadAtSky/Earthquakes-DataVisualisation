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
var DeleteDemo;
(function (DeleteDemo) {
    let AWS = require("aws-sdk");
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });
    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();
    function deleteItem() {
        return __awaiter(this, void 0, void 0, function* () {
            //Table name and data for table
            let params = {
                TableName: "Crypto",
                Key: {
                    "Currency": "BTC",
                    "Time": 12345
                }
            };
            //Delete data from DynamoDB and handle errors
            try {
                let result = yield documentClient.delete(params).promise();
                console.log("Data deleted successfully: " + JSON.stringify(result));
            }
            catch (err) {
                console.error("ERROR deleting data: " + JSON.stringify(err));
            }
        });
    }
    deleteItem();
})(DeleteDemo || (DeleteDemo = {}));
