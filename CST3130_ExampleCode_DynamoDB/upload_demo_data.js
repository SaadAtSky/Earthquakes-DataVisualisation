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
var UploadDemo;
(function (UploadDemo) {
    function uploadData() {
        return __awaiter(this, void 0, void 0, function* () {
            const AWS = require("aws-sdk");
            AWS.config.update({
                region: "us-east-1",
                endpoint: "https://dynamodb.us-east-1.amazonaws.com"
            });
            //Create new DocumentClient
            let docClient = new AWS.DynamoDB.DocumentClient();
            //Create Date class so we can obtain a starting timestamp
            let date = new Date();
            let startTimestamp = date.getTime();
            let currencies = [
                { name: "bitcoin", averagePrice: 3800 },
                { name: "ethereum", averagePrice: 128 },
                { name: "litecoin", averagePrice: 31 },
                { name: "tron", averagePrice: 0.03 }
            ];
            //Add dummy data for four currencies
            for (let curr of currencies) {
                //Add ten lots of data for each currency
                for (let ts = 0; ts < 10; ++ts) {
                    //Create parameters holding randomized data
                    let params = {
                        TableName: "CryptoCurrency",
                        Item: {
                            "CurrencySymbol": curr.name,
                            "CurrencyTimeStamp": startTimestamp + ts,
                            "Price": curr.averagePrice * (1 + 0.1 * (Math.random() - 0.5))
                        }
                    };
                    //Add data to database
                    try {
                        let result = yield docClient.put(params).promise();
                        console.log("Currency added to table:", curr.name);
                    }
                    catch (err) {
                        console.error("Unable to add currency", curr.name);
                        console.error("Error JSON:", JSON.stringify(err));
                    }
                }
            }
        });
    }
    uploadData();
})(UploadDemo || (UploadDemo = {}));
