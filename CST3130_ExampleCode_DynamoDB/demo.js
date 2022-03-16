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
const AWS = require("aws-sdk");
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
//Create new DocumentClient
let docClient = new AWS.DynamoDB.DocumentClient();
function storeData() {
    return __awaiter(this, void 0, void 0, function* () {
        let params = {
            TableName: "CryptoData",
            Item: {
                "TimeStamp": 83723493274,
                "Currency": "BTC",
                "Price": 3232.32
            }
        };
        try {
            yield docClient.put(params).promise();
        }
        catch (err) {
            console.error(err);
        }
    });
}
storeData();
