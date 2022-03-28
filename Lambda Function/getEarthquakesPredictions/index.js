//Import AWS
let AWS = require("aws-sdk");
let documentClient = new AWS.DynamoDB.DocumentClient();

//Data that we are going to send to endpoint
let endpointData = {
    "instances": [
        { "start": "1987-01-01", "target": [103, 131, 109, 105, 109, 112, 139, 126, 125, 97, 108, 124, 137, 96, 115, 127, 157, 161, 156, 148, 148, 94, 105, 81, 89, 101, 124, 110, 195, 97, 90, 107, 111, 100, 150, 103, 135, 81, 98, 93, 143, 167, 119, 105, 106, 105, 137, 105, 131, 326, 120, 94, 105, 158, 77, 101, 99, 94, 71, 105, 131] }, { "start": "1987-01-01", "target": [20, 25, 18, 24, 34, 24, 29, 35, 33, 21, 21, 31, 19, 13, 23, 35, 19, 16, 24, 14, 20, 30, 15, 24, 16, 27, 15, 33, 29, 31, 21, 20, 27, 24, 33, 25, 94, 124, 51, 34, 37, 31, 51, 49, 46, 21, 40, 23, 27, 29, 23, 39, 23, 24, 30, 22, 24, 25, 23, 19, 16] }, { "start": "1987-01-01", "target": [17, 21, 14, 9, 21, 23, 19, 15, 20, 7, 12, 9, 26, 28, 16, 13, 9, 20, 16, 13, 22, 7, 28, 23, 13, 10, 16, 14, 21, 10, 9, 20, 20, 17, 21, 14, 24, 16, 18, 23, 10, 26, 13, 27, 18, 20, 16, 15, 13, 13, 13, 20, 6, 13, 14, 23, 22, 11, 11, 12, 26] }, { "start": "1987-01-01", "target": [22, 44, 39, 44, 35, 31, 22, 42, 34, 44, 23, 31, 45, 24, 40, 32, 32, 41, 53, 31, 42, 45, 52, 32, 32, 25, 37, 19, 32, 60, 36, 40, 20, 31, 29, 35, 30, 32, 34, 33, 42, 40, 62, 27, 27, 28, 29, 118, 31, 38, 37, 40, 39, 18, 36, 76, 28, 30, 86, 45, 39] }, { "start": "1987-01-01", "target": [87, 50, 52, 60, 46, 47, 32, 52, 44, 49, 45, 51, 58, 63, 46, 41, 41, 47, 55, 49, 52, 36, 42, 35, 41, 36, 53, 56, 42, 41, 46, 31, 46, 36, 42, 62, 47, 46, 31, 50, 41, 35, 62, 45, 56, 52, 67, 43, 52, 47, 65, 36, 41, 34, 55, 48, 35, 39, 54, 37, 37] }]
    ,
    "configuration": {
        "num_samples": 20,
        "output_types": [
            "mean",
            "quantiles"
        ],
        "quantiles": [
            "0.1",
            "0.9"
        ]
    }
};

//Name of endpoint
//REPLACE THIS WITH THE NAME OF YOUR ENDPOINT
const endpointName = "endPointEarthquakes";

//Parameters for calling endpoint
let params = {
    EndpointName: endpointName,
    Body: JSON.stringify(endpointData),
    ContentType: "application/json",
    Accept: "application/json"
};

//AWS class that will query endpoint
let awsRuntime = new AWS.SageMakerRuntime({});

//Handler for Lambda function
exports.handler = (event) => {
    //Call endpoint and handle response
    awsRuntime.invokeEndpoint(params, (err, data)=>{
        if (err) {//An error occurred
            console.log(err, err.stack);

            //Return error response
            const response = {
                statusCode: 500,
                body: JSON.stringify('ERROR: ' + JSON.stringify(err)),
            };
            return response;
        }
        else{//Successful response
            //Convert response data to JSON
            let responseData = JSON.parse(Buffer.from(data.Body).toString('utf8'));
            responseData = JSON.parse(JSON.stringify(responseData));

            //TODO: STORE DATA IN PREDICTION TABLE
            let numberOfRegions = 5;
            for(let i = 0;i<numberOfRegions;i++){
                let region = (i+1);
                let params2 = {
                  TableName: "Predictions_Earthquakes",
                  Item: {
                    'Region': region,
                    'Mean': responseData.predictions[i].mean,
                    'Lower': responseData.predictions[i].quantiles["0.1"],
                    'Upper': responseData.predictions[i].quantiles["0.9"] 
                  }
                };
                try {
                  let result = documentClient.put(params2).promise();
                  console.log("Data uploaded successfully: " + JSON.stringify(result));
                } catch (err) {
                  console.error("ERROR uploading data: " + JSON.stringify(err));
                }
            }

            //Return successful response
            const response = {
                statusCode: 200,
                body: JSON.stringify('Predictions stored.'),
            };
            return response;
        }
    });
};

