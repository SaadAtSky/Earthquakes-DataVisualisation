/* Minimum and maximum longitude and latitude for
    London area (square box around London) */
const minLonLat = 51.698364;
const minLonLon = -0.467122;
const maxLonLat = 51.315432;
const maxLonLon = 0.268640;

//Returns random locations within London
function getLondonLocations(numItems){
    let latitudeArray = [];
    let longitudeArray = [];
    let labelArray = [];

    for(let i=0; i<numItems; ++i){
        //Generate random latitude
        let tmpLat = minLonLat + Math.random() * (maxLonLat - minLonLat);
        let tmpLon = minLonLon + Math.random() * (maxLonLon - minLonLon);

        //Store random point in arrays
        latitudeArray.push(tmpLat);
        longitudeArray.push(tmpLon);
        labelArray.push("Point " + i);
    }

    //Create and return object containing data
    let resultObj = {
        latArray: latitudeArray,
        lonArray: longitudeArray,
        labelArray: labelArray
    };
    return resultObj;
}

