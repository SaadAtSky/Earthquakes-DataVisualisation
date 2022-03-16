//Key for MapIt API
const MAPIT_KEY="fUjjBWk52U7SWHDdBUaKiD5YPVfzAl6s5BS7pToT";

//Returns an array of MapIt area IDs for the London boroughs
async function getLondonBoroughIDs(){
    //Get the list of London boroughs (https://mapit.mysociety.org/docs/#general)
    let url = "https://mapit.mysociety.org/areas/LBO?api_key=" + MAPIT_KEY;

    //Get the list of IDs of London Boroughs
    let response = await axios.get(url);

    //Return an array containing the IDs
    return Object.keys(response.data);
}

//Returns the geometry
async function getGeoJSONArea(areaID){
    let url = "https://mapit.mysociety.org/area/" + areaID + ".geojson?api_key=" + MAPIT_KEY;

    //Get the list of IDs of London Boroughs
    let response = await axios.get(url);

    //Build and return geometry object in geoJSON format
    let geometryObj = {
        "type": "FeatureCollection",
        "features": [{
            "geometry": response.data
        }]
    };
    return geometryObj;
}

//Returns an array of the geometry of London boroughs in geoJSON format
async function getLondonBoroughs(){
    try {
        //Get the MapIt area IDs for the London boroughs
        let londonBoroughAreaIDs = await getLondonBoroughIDs();

        //Get promises to get the geometry of the London boroughs
        let promiseArray = londonBoroughAreaIDs.map( async id => {
            return await getGeoJSONArea(id);
        });

        //Execute the promises and return the result
        let result = await Promise.all(promiseArray);
        return result;
    }
    catch(err){
        console.log("ERROR: " + err);
    }
}
