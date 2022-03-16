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
exports.Fixer = void 0;
//Time library that we will use to increment dates.
const moment = require('moment');
//Axios will handle HTTP requests to web service
const axios = require('axios');
//Reads keys from .env file
const dotenv = require('dotenv');
//Copy variables in file into environment variables
dotenv.config();
//Class that wraps fixer.io web service
class Fixer {
    constructor() {
        //Base URL of fixer.io API
        this.baseURL = "http://data.fixer.io/api/";
    }
    //Returns a Promise that will get the exchange rates for the specified date
    getExchangeRates(date) {
        //Build URL for API call
        let url = this.baseURL + date + "?";
        url += "access_key=" + process.env.FIXERIO_API_KEY;
        url += "&symbols=USD,CAD,GBP";
        //Output URL and return Promise
        console.log("Building fixer.io Promise with URL: " + url);
        return axios.get(url);
    }
}
exports.Fixer = Fixer;
//Gets the historical data for a range of dates.
function getHistoricalData(startDate, numDays) {
    return __awaiter(this, void 0, void 0, function* () {
        /* You should check that the start date plus the number of days is
        less than the current date*/
        //Create moment date, which will enable us to add days easily.
        let date = moment(startDate);
        //Create instance of Fixer.io class
        let fixerIo = new Fixer();
        //Array to hold promises
        let promiseArray = [];
        //Work forward from start date
        for (let i = 0; i < numDays; ++i) {
            //Add axios promise to array
            promiseArray.push(fixerIo.getExchangeRates(date.format("YYYY-MM-DD")));
            //Increase the number of days
            date.add(1, 'days');
        }
        //Wait for all promises to execute
        try {
            let resultArray = yield Promise.all(promiseArray);
            //Output the data
            resultArray.forEach((result) => {
                console.log(result);
                //data contains the body of the web service response
                let data = result['data'];
                //Check that API call succeeded.
                if (data.success != true) {
                    console.log("Error: " + JSON.stringify(data.error));
                }
                else {
                    //Output the result - you should put this data in the database
                    console.log("Date: " + data.date +
                        " USD: " + data.rates.USD +
                        " CAD: " + data.rates.CAD +
                        " GBP: " + data.rates.GBP);
                }
            });
        }
        catch (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    });
}
//Call function to get historical data
getHistoricalData('2015-12-24', 10);
