'use strict';

const fs = require('fs');

let completeData
let trainData = { start: "2020-03-21 16:00:00", target: [] }
let testData = { start: "2020-03-21 16:00:00", target: [] }

loadData()
splitData()
saveFiles()

function loadData() {
    let rawdata = fs.readFileSync('Synthetic Data/M00732071.json');
    completeData = JSON.parse(rawdata);
}


function splitData() {
    let counter = 0
    completeData.target.forEach(function (data) {
        if (counter < 400) {
            trainData.target.push(data)
        }
        else {
            testData.target.push(data)
        }
        counter++
    })
    console.log("train data length: " + trainData.target.length)
    console.log("test data length: " + testData.target.length)

}

function saveFiles(){
    fs.writeFile("Synthetic Data/trainData.json", JSON.stringify(trainData), function(err, result) {
        if(err) console.log('error', err);
    });
    fs.writeFile("Synthetic Data/testData.json", JSON.stringify(testData), function(err, result) {
        if(err) console.log('error', err);
    });
}
