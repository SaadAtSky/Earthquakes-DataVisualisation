function plot() {
    // build layersArray
    let layerObjFreq,layerObjMag
    let layerArrayFreq = []
    let layerArrayMag = []
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        // console.log("Transparency Freq region " + (regionIndex + 1) + ": " + transparencyFreq[regionIndex])
        color = 'rgba(0,0,0,' + transparencyFreq[regionIndex] + ')'
        layerObjFreq = {
            sourcetype: "geojson",
            source: regions_geojson[regionIndex],
            type: 'fill',
            color: color
        }
        console.log("Transparency Mag region " + (regionIndex + 1) + ": " + transparencyMag[regionIndex])
        color = 'rgba(0,0,0,' + transparencyMag[regionIndex] + ')'
        layerObjMag = {
            sourcetype: "geojson",
            source: regions_geojson[regionIndex],
            type: 'fill',
            color: color
        }
        layerArrayFreq.push(layerObjFreq)
        layerArrayMag.push(layerObjMag)
    }

    //Build layout for plot
    let layoutFreq = {
        title: "Frequency",
        height: 700,
        width: 680,
        mapbox: {
            center: {
                lat: 0,
                lon: 0
            },
            style: 'light',
            zoom: 0,
            layers: layerArrayFreq
        }
    };
        //Build layout for plot
        let layoutMag = {
            title: "Average Magnitude",
            height: 700,
            width: 680,
            mapbox: {
                center: {
                    lat: 0,
                    lon: 0
                },
                style: 'light',
                zoom: 0,
                layers: layerArrayMag
            }
        };
    Plotly.newPlot("mapDivFreq", data, layoutFreq, config)
    Plotly.newPlot("mapDivMag", data, layoutMag, config)
}

// initialize default values for transparency
function initTransparency() {
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        transparencyFreq[regionIndex] = 0
        transparencyMag[regionIndex] = 0
    }
}

function buildCurrentYearDataArray() {
    currentYearDataArray = []
    for (let index = 0; index < earthquakesData.length; index++) {
        if (new Date(earthquakesData[index].Timestamp).getFullYear() == currentYear) {
            currentYearDataArray.push(earthquakesData[index])
        }
    }
}

function updateTransparency() {
    let annualFrequency = []
    let annualMagnitude = []
    for (let index = 0; index < numberOfRegions; index++) {
        annualFrequency[index] = 0
        annualMagnitude[index] = 0
    }
    for (let index = 0; index < currentYearDataArray.length; index++) {
        for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
            if (currentYearDataArray[index].Region.localeCompare("region " + (regionIndex + 1)) == 0) {
                annualFrequency[regionIndex] = annualFrequency[regionIndex] + currentYearDataArray[index].Frequency
                annualMagnitude[regionIndex] = annualMagnitude[regionIndex] + currentYearDataArray[index].Magnitude
            }
        }
    }
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        transparencyFreq[regionIndex] = annualFrequency[regionIndex] / maxFrequency
        transparencyMag[regionIndex] = ((annualMagnitude[regionIndex] - minMagnitude) / (maxMagnitude - minMagnitude))
    }
}

function getMaximumFrequency() {
let yearlyFrequency = []
let yearlyMagnitude = []
for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
    yearlyFrequency[regionIndex] = 0
    yearlyMagnitude[regionIndex] = 0
}
for (let year = 1965; year < 2017; year++) {
for (let index = 0; index < earthquakesData.length; index++) {
    if (new Date(earthquakesData[index].Timestamp).getFullYear() == year) {
        for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
            if (earthquakesData[index].Region.localeCompare("region " + (regionIndex + 1)) == 0) {
                yearlyFrequency[regionIndex] = yearlyFrequency[regionIndex] + earthquakesData[index].Frequency
                yearlyMagnitude[regionIndex] = yearlyMagnitude[regionIndex] + earthquakesData[index].Magnitude
            }
        }
    }
}
for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
    if (yearlyFrequency[regionIndex] > maxFrequency) {
        maxFrequency = yearlyFrequency[regionIndex]
    }
    if (yearlyMagnitude[regionIndex] > maxMagnitude) {
        maxMagnitude = yearlyMagnitude[regionIndex]
    }
    if (yearlyMagnitude[regionIndex] < minMagnitude) {
        minMagnitude = yearlyMagnitude[regionIndex]
    }
    yearlyFrequency[regionIndex] = 0
    yearlyMagnitude[regionIndex] = 0
}
}
console.log("MAX FREQ: " + maxFrequency)
console.log("MAX MAG: " + maxMagnitude)
console.log("MIN MAG: " + minMagnitude)
}

function updateTransparencyPredictionsData(){
    let startingYear = 2017
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        let meanIndex = ((currentYear-startingYear)*2)
        // find the correct region
        predictionsData.forEach(function(data){
            if(data.Region == (regionIndex+1)){
                transparencyFreq[regionIndex] = (data.Mean[meanIndex]+data.Mean[meanIndex+1])/maxFrequency
            }
        })
    }
}
