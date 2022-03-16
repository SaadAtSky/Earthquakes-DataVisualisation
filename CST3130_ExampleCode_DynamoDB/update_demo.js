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
var UpdateDemo;
(function (UpdateDemo) {
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
        ExpressionAttributeValues: {
            ':pr': 1000
        }
    };
    function updateItem() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield documentClient.update(params).promise();
                console.log("Successful update: ");
                console.log(result);
            }
            catch (err) {
                console.error("Update Error:", JSON.stringify(err));
            }
        });
    }
    updateItem();
})(UpdateDemo || (UpdateDemo = {}));
