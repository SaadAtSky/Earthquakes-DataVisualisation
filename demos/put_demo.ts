// namespace PutDemo{
//     //link to AWS
//     let AWS = require("aws-sdk")

//     //tell AWS about region
//     AWS.config({
//         region : "jhk",
//         endpoint: ""
//     })

    //table name and data for table
    // let params = {
    //     TableName: "Earthquake",
    //     Item:{
    //         "longitude":"22.2"
    //     }
    // }

    // let params = {
    //     TableName: "Earthquake",
    //     KeyConditionExpression: "Currency = :curr",
    //     ProjectExpression:"Price",
    //     ExpressionAttributes:{
    //         "curr":"bitcoin"
    //     }
    // }

    // let params = {
    //     TableName: "Earthquake",
    //     Limit:5,
    //     KeyConditionExpression: "Currency = :curr",
    //     ExpressionAttributes:{
    //         "curr":"bitcoin"
    //     }
    // }

    // let params = {
    //     TableName: "Earthquake",
    //     KeyConditionExpression: "Currency = :curr",
    //     ScanIndexForward: false,//according to scan index e.g time
    //     ExpressionAttributes:{
    //         "curr":"bitcoin"
    //     }
    // }

        //store data in Dynamo Data

    //scan table to retrieve all data
//     async function GetData(){

//     }

//     }
// }