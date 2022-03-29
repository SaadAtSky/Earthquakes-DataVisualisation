'use strict';

// declare all required variables including node modules and arrays
const fs = require('fs');
const moment = require('moment');
const WebSocket = require('ws');

let testData = [] // 104 items per region
let trainData = [] // 84 items per region
let validationData = [] // 60 items per region
let earthquakesData = [] // 520 items
let numberOfRegions = 5

// build earthquakesData using result form websockets
//Open connection
let connection = new WebSocket("wss://etjk1s1k10.execute-api.us-east-1.amazonaws.com/prod");

//Log connected response
connection.onopen = function (event) {
    console.log("Connected: " + JSON.stringify(event));
    getFrequencies()
};

// Upon connection to the WebSocket, build the earthquakes table, split data
// into train/test/validation files and save these files in JSON format
connection.onmessage = function (msg) {
    let numberOfRowsOfEarthquakeData = 520
    if (JSON.parse(msg.data).Count == numberOfRowsOfEarthquakeData) {
        console.log("Earthquake Data recieved.");
        earthquakesData = JSON.parse(msg.data).Items
        init()
        buildCompleteData()
        splitData()
        saveFiles()
    }
}

//Log errors
connection.onerror = function (error) {
    console.log("WebSocket Error: " + JSON.stringify(error));
}

//Send request to server
function getFrequencies() {
    //Create request to be sent to server
    let requestObject = {
        action: "getEarthquakesData",//Used for routing in API Gateway
    };

    //Send message
    connection.send(JSON.stringify(requestObject));

    //Log result
    console.log("Message sent: " + JSON.stringify(requestObject));
}

// build a sorted test data array containing all frequency/magnitude values from the returned data for each region
function buildCompleteData() {
    for (let year = 1965; year <= 2022; year++) {
        let yearlyData = []
        earthquakesData.forEach(function (data) {
            if (new Date(data.Timestamp).getFullYear() == year) {
                yearlyData.push(data)
            }
        })
        for (let region = 0; region < numberOfRegions; region++) {
            let array = [] // used to build array for items in the yearlyArray that belong to the particular region sorted according to timestamp
            yearlyData.forEach(function (data) {
                if (data.Region.localeCompare("region " + (region + 1)) == 0) {
                    if (array.length == 1) {
                        if (array[0].Timestamp < data.Timestamp) {
                            array.push(data)
                        }
                        else {
                            let temp = array[0]
                            array[0] = data
                            array[1] = temp
                        }
                    }
                    else {
                        array.push(data)
                    }
                }
            })
            array.forEach(function (data) {
                testData[region].target.push(data.Frequency) // data could be Frequency or Magnitude
            })
        }
    }
}

// split the data into train and validation data arrays with updated start time for valdiation data array
function splitData() {
    for (let region = 0; region < numberOfRegions; region++) {
        let counter = 0
        let validationStartingDate = moment(new Date(testData[0].start))
        testData[region].target.forEach(function (data) {
            if (counter < 84) { // build train data and increment start date for validationData
                trainData[region].target.push(data)
            }
            if (counter < 43) { // build validationData
                if (counter % 2 == 0) {
                    validationStartingDate.add(12, "months") // each 2 values for each region represents 12 months as values are separated by 6-month period
                }
            }
            else {
                validationData[region].target.push(data)
            }
            counter++
        })
        validationData[region].start = validationStartingDate.format("YYYY-MM-DD") // set validationData start date
    }
}

// save files using the train/test/validation data arrays for Magnitude or Frequency
function saveFiles() {
    fs.writeFile("Datasets for ML/earthquakes/train.json", JSON.stringify(trainData), function (err, result) {
        if (err) console.log('error', err);
    });
    fs.writeFile("Datasets for ML/earthquakes/test.json", JSON.stringify(testData), function (err, result) {
        if (err) console.log('error', err);
    });
    fs.writeFile("Datasets for ML/earthquakes/validation.json", JSON.stringify(validationData), function (err, result) {
        if (err) console.log('error', err);
    });
}

// initialize the data arrays with default values
function init() {
    let startDate = new Date(earthquakesData[0].Timestamp) // the first date for the earthquakes data i.e 1965
    startDate = moment(startDate)
    for (let region = 0; region < numberOfRegions; region++) {
        testData.push({ start: startDate.format("YYYY-MM-DD"), region: region, target: [] })
        trainData.push({ start: startDate.format("YYYY-MM-DD"), region: region, target: [] })
        validationData.push({ start: "", target: [] })
    }
}