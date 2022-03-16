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
var PutDemo;
(function (PutDemo) {
    //Link to AWS-SDK
    const AWS = require("aws-sdk");
    //Tell AWS about region
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });
    function putData() {
        return __awaiter(this, void 0, void 0, function* () {
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
            };
            //Store data in DynamoDB and handle errors
            try {
                let result = yield documentClient.put(params).promise();
                console.log("Data uploaded successfully: " + JSON.stringify(result));
            }
            catch (err) {
                console.error("ERROR uploading data: " + JSON.stringify(err));
            }
        });
    }
    putData();
})(PutDemo || (PutDemo = {}));
