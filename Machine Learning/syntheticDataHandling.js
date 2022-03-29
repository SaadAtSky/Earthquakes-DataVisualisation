'use strict';

const fs = require('fs');
const moment = require('moment');

let testData // 500 points
let trainData = { start: "", target: [] } // 400 points
let validationData = { start: "", target: [] } // 100 points

loadData()
splitData()
saveFiles()

// convert JSON file to data array
function loadData() {
    let rawdata = fs.readFileSync('Datasets for ML/M00732071.json');
    testData = JSON.parse(rawdata);
}

// split synthetic data file into test/train/validation data array
function splitData() {
    let validationStartingDate = new moment(testData.start)
    let counter = 0
    testData.target.forEach(function (data) {
        if (counter < 400) {
            trainData.target.push(data)
            validationStartingDate.add(1, "hours") // increment the hours interval for each value
        }
        else {
            validationData.target.push(data)
        }
        counter++
    })
    trainData.start = testData.start
    validationData.start = validationStartingDate.format("YYYY-MM-DD HH:mm:ss") // set the update start point for the validation data array
}

// data arrays to JSON that can be uploaded to S3 and used to create endpoint
function saveFiles() {
    fs.writeFile("Datasets for ML/synthetic/train.json", JSON.stringify(trainData), function (err, result) {
        if (err) console.log('error', err);
    });
    fs.writeFile("Datasets for ML/synthetic/test.json", JSON.stringify(testData), function (err, result) {
        if (err) console.log('error', err);
    });
    fs.writeFile("Datasets for ML/synthetic/validation.json", JSON.stringify(validationData), function (err, result) {
        if (err) console.log('error', err);
    });
}
