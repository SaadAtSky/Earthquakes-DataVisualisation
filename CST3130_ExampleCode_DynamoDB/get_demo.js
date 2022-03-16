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
var GetDemo;
(function (GetDemo) {
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
    function getItem() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield documentClient.get(params).promise();
                console.log("Successful get Item: ");
                console.log(result);
            }
            catch (err) {
                console.error("Get Error:", JSON.stringify(err));
            }
        });
    }
    getItem();
})(GetDemo || (GetDemo = {}));
