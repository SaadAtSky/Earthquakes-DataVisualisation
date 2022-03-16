const csv = require("csv-parser")
const fs = require('fs');
const { execArgv } = require("process");
const results = []
let r1 = 0
let r2 = 0
let r3 = 0
let r4 = 0
let r5 = 0
fs.createReadStream('database.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // for(let i =0;i<23412;i++)
            let i = 0
        while (parseInt(results[i].Date.substring(6, 10)) == 1965) {
            // console.log(regionDivider(parseInt(results[i].Longitude)))
            // console.log(results[i].Date.substring(6,10))
            // console.log(dateConverter(results[i].Date))
            // console.log(results[i].Magnitude)
            // while (dateConverter(results[i].Date).localeCompare("first")) {
                if(dateConverter(results[i].Date).localeCompare("first")){
                    eq.region = regionDivider(parseInt(results[i].Longitude))
                    eq.year = results[i].Date.substring(6, 10)
                    eq.half = dateConverter(results[i].Date)
                    eq.frequency = eq.frequency + 1
                    eq.magnitude = results[i].Magnitude
                }
                else{
                    eq.region = regionDivider(parseInt(results[i].Longitude))
                    eq.year = results[i].Date.substring(6, 10)
                    eq.half = dateConverter(results[i].Date)
                    eq.frequency = eq.frequency + 1
                    eq.magnitude = results[i].Magnitude
                }

                i++
        }
        console.log(eq.frequency)
    });

function dateConverter(date) {
    let month = date.split("/")
    if (parseInt(month[0]) < 6) {
        return "first"
    }
    else {
        return "second"
    }
}
let eq = {
    region: "",
    half: "",
    year: "",
    magnitude: "",
    frequency: 0
}

function regionDivider(longitude) {
    if (longitude > 108 & longitude <= 180) {
        r1++
        return "region 1"
    }
    if (longitude > 36 & longitude <= 108) {
        r2++
        return "region 2"
    }
    if (longitude > -36 & longitude <= 36) {
        r3++
        return "region 3"
    }
    if (longitude > -36 & longitude <= -108) {
        r4++
        return "region 4"
    }
    if (longitude >= -180 & longitude <= -108) {
        r5++
        return "region 5"
    }
}
