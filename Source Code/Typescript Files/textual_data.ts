import Guardian from 'guardian-js'
let apikey:string = '85e7fd2b-56f1-4deb-98c3-d622f9132eac'
const guardian = new Guardian(apikey, false)
let totalPages:number = 88
const AWS = require('aws-sdk')
AWS.config.update({
    region: "us-east-1",
    endpoint: "https://dynamodb.us-east-1.amazonaws.com"
})

// loop through the results pages
for (let index:number = 1; index <= totalPages; index++) {
    getData(index)
}

// for each page store data and send data to dynamoDB
async function getData(pageNumber: number) {
    guardian.content.search("earthquake%20AND%20magnitude", { page: pageNumber, section: "world", orderBy: "oldest" }).then(
        function (response:{body:string}):void {
            console.log(response.body)
            let response_json = JSON.parse(response.body)
            for (let i = 0; i < response_json.response.results.length; i++) {
                console.log("Title: " + response_json.response.results[i].webTitle)
                console.log("Section Name: " + response_json.response.results[i].sectionName)
                console.log("Date: " + Date.parse(response_json.response.results[i].webPublicationDate) + "\n")
                putData(response_json.response.results[i])
            }
        }
    )
}

// sending data to dynamoDB
async function putData(data:{webPublicationDate:string,webTitle:string}){
    let documentClient = new AWS.DynamoDB.DocumentClient()
    let params:object = {
        TableName : 'Guardian_newspaper',
        Item : {
            'Timestamp' : Date.parse(data.webPublicationDate),
            'Text' : data.webTitle,
        }
    }
    try{
        let result = await documentClient.put(params).promise()
        console.log("Data succussfully send to DynamoDB "+JSON.stringify(result))
    }
    catch(err) {
        console.log("Error sending data to DynamoDB "+JSON.stringify(err))
    }
}
