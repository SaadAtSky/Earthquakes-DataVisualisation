// Build and plot the Chloropleth Map
function plot() {
    // build layersArray
    let layerObjFreq, layerObjMag
    let layerArrayFreq = []
    let layerArrayMag = []
    // build transparency arrays for frequency/magnitude values representing each of the 5 regions
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        console.log("Transparency Freq region " + (regionIndex + 1) + ": " + transparencyFreq[regionIndex])
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

    //Build layouts for plot
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

// store all data for the currentYear into an array
function buildCurrentYearDataArray() {
    currentYearDataArray = []
    for (let index = 0; index < earthquakesData.length; index++) {
        if (new Date(earthquakesData[index].Timestamp).getFullYear() == currentYear) {
            currentYearDataArray.push(earthquakesData[index])
        }
    }
}

// Update transparency value for the map based on the frequencies and magnitudes for each region
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

// store the value for the maximum frequency across all 52 years
function getMaximumFrequencyAndMagnitude() {
    let yearlyFrequency = []
    let yearlyMagnitude = []
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        yearlyFrequency[regionIndex] = 0
        yearlyMagnitude[regionIndex] = 0
    }
    // build a single frequency/magnitude value for each year and update maximum frequency/magnitude value accordingly
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
}

// update transparency values for the results returned from the predictions tables
// for each region's annual frequency and magnitude between 2017-2027
function updateTransparencyPredictionsData() {
    let startingYear = 2017
    for (let regionIndex = 0; regionIndex < numberOfRegions; regionIndex++) {
        // a self-derived formulae for building and array of         
        // 5 elements represents annual frequency/magnitude for each region
        let meanIndex = ((currentYear - startingYear) * 2) 
        // find the correct region and update its transparency value based on annual frequency
        predictionsDataFreq.forEach(function (data) {
            if (data.Region == (regionIndex + 1)) {
                transparencyFreq[regionIndex] = (data.Mean[meanIndex] + data.Mean[meanIndex + 1]) / maxFrequency
            }
        })
        // find the correct region and update its transparency value based on annual magnitude
        predictionsDataMag.forEach(function (data) {
            if (data.Region == (regionIndex + 1)) {
                transparencyMag[regionIndex] = (data.Mean[meanIndex] + data.Mean[meanIndex + 1] - minMagnitude) / (maxMagnitude - minMagnitude)
            }
        })
    }
}
