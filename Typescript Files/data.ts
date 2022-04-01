const csv = require('csv-parser')
const fs = require('fs')
const results = []
let rawData:{'region 1':{Date:string,Frequency:number,Magnitude:number},
'region 2':{Date:string,Frequency:number,Magnitude:number}
'region 3':{Date:string,Frequency:number,Magnitude:number}
'region 4':{Date:string,Frequency:number,Magnitude:number}
'region 5':{Date:string,Frequency:number,Magnitude:number}}={}
let timeSeries:[] = []
const moment = require('moment')
let startDate = moment("01/01/1965")
let endDate = moment("07/01/1965")
let counter = 0
const AWS = require('aws-sdk')
  //Tell AWS about region
  AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
});

initialize() // the array that stoes earthquakes data for each region

// read csv file and convert to JSON
fs.createReadStream('./Typescript Files/data/earthquake.csv')
  .pipe(csv())
  .on('data', (data:object) => {
    //row by row
    generateTimeSeries(data)
  })
  .on('end', () => {
    // end of file reached
    averageMagnitude(rawData) //last iteration
    timeSeries.push(rawData)
    for (let index:number = 0; index < timeSeries.length; index++) {
      //store to dynamo DB
      putData(timeSeries[index])
    }
  });

async function putData(data: object[]){
  for(let index:number = 1;index<6;index++){
    let documentClient = new AWS.DynamoDB.DocumentClient()
    let region:string = 'region '+index
    let params = {
      TableName: "Earthquakes",
      Item: {
        'Timestamp': data[region].Date,
        'Region': region,
        'Frequency': data[region].Frequency,
        'Magnitude': data[region].Magnitude
      },
    }
    try {
      let result = await documentClient.put(params).promise();
      console.log("Data uploaded successfully: " + JSON.stringify(result));
    } catch (err) {
      console.error("ERROR uploading data: " + JSON.stringify(err));
    }
  }

}

function initialize() {
  rawData['region 1'] = { 'Date': '', 'Frequency': 0, 'Magnitude': 0 }
  rawData['region 2'] = { 'Date': '', 'Frequency': 0, 'Magnitude': 0 }
  rawData['region 3'] = { 'Date': '', 'Frequency': 0, 'Magnitude': 0 }
  rawData['region 4'] = { 'Date': '', 'Frequency': 0, 'Magnitude': 0 }
  rawData['region 5'] = { 'Date': '', 'Frequency': 0, 'Magnitude': 0 }
}

function generateTimeSeries(data: { Date: string}): void {
  if (endDate.isAfter(data.Date)) {
    storeData(data)
  }
  else {
    averageMagnitude(rawData)
    timeSeries.push(rawData)
    rawData = {}
    initialize()
    endDate.add(6, 'months')
    startDate.add(6, 'months')
  }
}

function storeData(data: { Longitude: string; Magnitude: string }):void {
  let region:string = regionFinder(parseFloat(data.Longitude))
  rawData[region] = { 'Date': new Date(startDate.format('MM-DD-YYYY')).getTime(), 'Frequency': parseInt(rawData[region].Frequency) + 1, 'Magnitude': parseFloat(rawData[region].Magnitude) + parseFloat(data.Magnitude) }
}

function averageMagnitude(): void {
  rawData['region 1'].Magnitude = rawData['region 1'].Magnitude / rawData['region 1'].Frequency
  rawData['region 2'].Magnitude = rawData['region 2'].Magnitude / rawData['region 2'].Frequency
  rawData['region 3'].Magnitude = rawData['region 3'].Magnitude / rawData['region 3'].Frequency
  rawData['region 4'].Magnitude = rawData['region 4'].Magnitude / rawData['region 4'].Frequency
  rawData['region 5'].Magnitude = rawData['region 5'].Magnitude / rawData['region 5'].Frequency
}

function regionFinder(longitude: number): string {
  if (longitude > 108 && longitude <= 180) {
    return "region 1"
  }
  if (longitude > 36 && longitude <= 108) {
    return "region 2"
  }
  if (longitude > -36 && longitude <= 36) {
    return "region 3"
  }
  if (longitude > -108 && longitude <= -36) {
    return "region 4"
  }
  if (longitude >= -180 && longitude <= -108) {
    return "region 5"
  }
  else {
    return 'null'
  }
}