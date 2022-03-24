function plot() {
    // build layersArray
    layerArray = []
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        // if(isNaN(transparency[regionIndex])){
        //     transparency[regionIndex] = 0
        // }
        console.log("Transparency region " + (regionIndex + 1) + ": " + transparency[regionIndex])
        color = 'rgba(0,0,0,' + transparency[regionIndex] + ')'
        layerObj = {
            sourcetype: "geojson",
            source: regions_geojson[regionIndex],
            type: 'fill',
            color: color
        }
        layerArray.push(layerObj)
    }

    //Build layout for plot
    let layout = {
        title: "Frequency of Earthquakes",
        height: 700,
        width: 680,
        mapbox: {
            center: {
                lat: 0,
                lon: 0
            },
            style: 'light',
            zoom: 0,
            layers: layerArray
        }
    };
    Plotly.newPlot("mapDiv", data, layout, config)
}

// initialize default values for transparency
function initTransparency() {
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        transparency[regionIndex] = 0
    }
}

function buildCurrentYearDataArray() {
    currentYearDataArray = []
    for (let index = 0; index < earthquakesData.length; index++) {
        // console.log("year: "+new Date(earthquakesData[index].Timestamp).getFullYear())
        // console.log("current year: "+currentYear)
        if (new Date(earthquakesData[index].Timestamp).getFullYear() == currentYear) {
            // console.log("current year: "+currentYear)
            // console.log(earthquakesData[index])
            currentYearDataArray.push(earthquakesData[index])
        }
    }
}

function updateTransparency() {
    let annualFrequency = []
    for (let index = 0; index < numberOfRegions; index++) {
        annualFrequency[index] = 0
    }
    for (let index = 0; index < currentYearDataArray.length; index++) {
        for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
            if (currentYearDataArray[index].Region.localeCompare("region " + (regionIndex + 1)) == 0) {
                annualFrequency[regionIndex] = annualFrequency[regionIndex] + currentYearDataArray[index].Frequency
            }
        }
    }
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        transparency[regionIndex] = annualFrequency[regionIndex] / maxFrequency
    }
}

function getMaximumFrequency() {
let yearlyFrequency = []
for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
yearlyFrequency[regionIndex] = 0
}
for (let year = 1965; year < 2017; year++) {
for (let index = 0; index < earthquakesData.length; index++) {
    if (new Date(earthquakesData[index].Timestamp).getFullYear() == year) {
        for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
            if (earthquakesData[index].Region.localeCompare("region " + (regionIndex + 1)) == 0) {
                yearlyFrequency[regionIndex] = yearlyFrequency[regionIndex] + earthquakesData[index].Frequency
            }
        }
    }
}
for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
    if (yearlyFrequency[regionIndex] > maxFrequency) {
        maxFrequency = yearlyFrequency[regionIndex]
    }
    yearlyFrequency[regionIndex] = 0
}
}
console.log("MAX FREQ: " + maxFrequency)
}

function updateTransparencyPredictionsData(){
    let startingYear = 2017
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        let meanIndex = ((currentYear-startingYear)*2)
        // find the correct region
        predictionsData.forEach(function(data){
            if(data.Region == (regionIndex+1)){
                transparency[regionIndex] = (data.Mean[meanIndex]+data.Mean[meanIndex+1])/maxFrequency
            }
        })
    }
}
