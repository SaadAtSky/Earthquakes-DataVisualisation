const csv = require('csv-parser')
const fs = require('fs')
const results = []
let rawData = {}
let timeSeries = []
const moment = require('moment')
let startDate = moment("01/01/1965")
let endDate = moment("07/01/1965")
let counter=0

initialize()

fs.createReadStream('data/earthquake.csv')
  .pipe(csv())
  .on('data', (data) => {
      //row by row
    //   results.push(data)
    generateTimeSeries(data)
  })
  .on('end', () => {
    // end of file reached
    timeSeries.push(rawData)
    console.log(counter)
    for(let index = 0;index<timeSeries.length;index++){
        console.log(timeSeries[index]);
    }
  });

  function initialize(){
      rawData['region 1'] = {'Date':'','Frequency':0,'Magnitude':0}
      rawData['region 2'] = {'Date':'','Frequency':0,'Magnitude':0}
      rawData['region 3'] = {'Date':'','Frequency':0,'Magnitude':0}
      rawData['region 4'] = {'Date':'','Frequency':0,'Magnitude':0}
      rawData['region 5'] = {'Date':'','Frequency':0,'Magnitude':0}
  }

  function generateTimeSeries(data:string):void{
    if(endDate.isAfter(data.Date)){
        storeData(data)
        // console.log(data.Date)
        // console.log("bye")
    }
    else{
        // console.log("hi")
        averageMagnitude(rawData)
        timeSeries.push(rawData)
        rawData = {}
        initialize()
        endDate.add(6,'months')
        startDate.add(6,'months')
    }
  }

  function storeData(data:object){
     let region = regionFinder(parseFloat(data.Longitude))
    rawData[region] = {'Date':startDate.format('MM-DD-YYYY'),'Frequency':parseInt(rawData[region].Frequency)+1,'Magnitude':parseFloat(rawData[region].Magnitude)+parseFloat(data.Magnitude)}
  }

  function averageMagnitude(rawData:string):void{
    rawData['region 1'].Magnitude=rawData['region 1'].Magnitude/rawData['region 1'].Frequency
    rawData['region 2'].Magnitude=rawData['region 2'].Magnitude/rawData['region 2'].Frequency
    rawData['region 3'].Magnitude=rawData['region 3'].Magnitude/rawData['region 3'].Frequency
    rawData['region 4'].Magnitude=rawData['region 4'].Magnitude/rawData['region 4'].Frequency
    rawData['region 5'].Magnitude=rawData['region 5'].Magnitude/rawData['region 5'].Frequency
  }

  function regionFinder(longitude:float):string{
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
    else{
        return 'null'
    }
}