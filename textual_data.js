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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const guardian_js_1 = __importDefault(require("guardian-js"));
let apikey = '85e7fd2b-56f1-4deb-98c3-d622f9132eac';
const guardian = new guardian_js_1.default(apikey, false);
let totalPages = 88;
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});
for (let index = 1; index <= totalPages; index++) {
    getData(index);
}
function getData(pageNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        guardian.content.search("earthquake%20AND%20magnitude", { page: pageNumber, section: "world", orderBy: "oldest" }).then(function (response) {
            console.log(response.body);
            let response_json = JSON.parse(response.body);
            for (let i = 0; i < response_json.response.results.length; i++) {
                console.log("Title: " + response_json.response.results[i].webTitle);
                console.log("Section Name: " + response_json.response.results[i].sectionName);
                console.log("Date: " + Date.parse(response_json.response.results[i].webPublicationDate) + "\n");
                putData(response_json.response.results[i]);
            }
        });
    });
}
function putData(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let documentClient = new AWS.DynamoDB.DocumentClient();
        let params = {
            TableName: 'Guardian_newspaper',
            Item: {
                'Timestamp': Date.parse(data.webPublicationDate),
                'Text': data.webTitle,
            }
        };
        try {
            let result = yield documentClient.put(params).promise();
            console.log("Data succussfully send to DynamoDB " + JSON.stringify(result));
        }
        catch (err) {
            console.log("Error sending data to DynamoDB " + JSON.stringify(err));
        }
    });
}
// async function getTotalPageCount() {
//     let pages
//     pages = await guardian.content.search("earthquake%20AND%20magnitude", {section: "world", orderBy: "oldest" }).then(
//         async function (response) {
//             // console.log(response.body)
//             let response_json = await JSON.parse(response.body)
//             pages = response_json.response.pages
//             // console.log(pages)
//             return pages
//         }
//     )
// }
