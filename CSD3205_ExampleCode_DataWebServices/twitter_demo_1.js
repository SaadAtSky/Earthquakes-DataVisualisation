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
//Module that reads keys from .env file
const dotenv = require('dotenv');
//Node Twitter library
const Twitter = require('twitter');
//Copy variables in file into environment variables
dotenv.config();
//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
//Downloads and outputs tweet text
function searchTweets(keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //Set up parameters for the search
            let searchParams = {
                q: keyword,
                count: 10,
                lang: "en"
            };
            //Wait for search to execute asynchronously
            let result = yield client.get('search/tweets', searchParams);
            console.log(JSON.stringify(result));
            //Output the result
            result.statuses.forEach((tweet) => {
                console.log("Tweet id: " + tweet.id + ". Tweet text: " + tweet.text);
            });
        }
        catch (error) {
            console.log(JSON.stringify(error));
        }
    });
}
;
//Call function to search for tweets with specified subject
searchTweets("Middlesex University");
