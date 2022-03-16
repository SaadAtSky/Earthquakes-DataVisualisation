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
Object.defineProperty(exports, "__esModule", { value: true });
//Module that reads keys from .env file
const dotenv = require('dotenv');
//Node Twitter library
const Twitter = require('twitter');
//Database module
const database_function_1 = require("./database_function");
//Copy variables in file into environment variables
dotenv.config();
//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
//Function downloads and outputs tweet text
function storeTweets(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Set up parameters for the search
            let searchParams = {
                q: keyword,
                count: 10,
                lang: "en"
            };
            //Wait for search to execute asynchronously
            let twitterResult = yield client.get('search/tweets', searchParams);
            //Output the result
            let promiseArray = [];
            twitterResult.statuses.forEach((tweet) => {
                console.log("Tweet id: " + tweet.id + ". Tweet text: " + tweet.text);
                //Store save data promise in array
                promiseArray.push((0, database_function_1.saveData)(tweet.id, tweet.text));
            });
            //Execute all of the save data promises
            let databaseResult = yield Promise.all(promiseArray);
            console.log("Database result: " + JSON.stringify(databaseResult));
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    });
}
;
//Call function to search for tweets with specified subject
storeTweets("Middlesex University");
