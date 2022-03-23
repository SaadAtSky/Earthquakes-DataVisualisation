'use strict';

const fs = require('fs');
const moment = require('moment');

let testData
let trainData = { start: "", target: [] }
let validationData = { start: "", target: [] }

loadData()
splitData()
saveFiles()

function loadData() {
    let rawdata = fs.readFileSync('Datasets for ML/M00732071.json');
    testData = JSON.parse(rawdata);
}


function splitData() {
    let validationStartingDate = new moment(testData.start)
    let counter = 0
    testData.target.forEach(function (data) {
        if (counter < 400) {
            trainData.target.push(data)
            validationStartingDate.add(1,"hours")
        }
        else {
            validationData.target.push(data)
        }
        counter++
    })
    trainData.start = testData.start
    validationData.start = validationStartingDate.format("YYYY-MM-DD HH:mm:ss")
}

function saveFiles(){
    fs.writeFile("Datasets for ML/synthetic/train.json", JSON.stringify(trainData), function(err, result) {
        if(err) console.log('error', err);
    });
    fs.writeFile("Datasets for ML/synthetic/test.json", JSON.stringify(testData), function(err, result) {
        if(err) console.log('error', err);
    });
    fs.writeFile("Datasets for ML/synthetic/validation.json", JSON.stringify(validationData), function(err, result) {
        if(err) console.log('error', err);
    });
}
