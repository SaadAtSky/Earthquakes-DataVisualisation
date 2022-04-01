let AWS = require('aws-sdk')

exports.handler = async (event) => {
    
    let documentClient = new AWS.DynamoDB.DocumentClient()
    let comprehend = new AWS.Comprehend()
    
    for(let record of event.Records){
        if(record.eventName==="INSERT"){
            //calculate sentiment
            try{
                let params1 = {
                    LanguageCode :'en',
                    Text : record.dynamodb.Keys.Text.S
                }
                let result = await comprehend.detectSentiment(params1).promise()
                let params2 = {
                    TableName:'SentimentData',
                    Item:{
                        Timestamp:parseInt(record.dynamodb.Keys.Timestamp.N),
                        Sentiment:result
                    }
                }
                await documentClient.put(params2).promise()
                console.log("Saved")
            }
            catch (err){
                console.log("Error "+ err)
            }
        }
        else if(record.eventName==="DELETE"){
            console.log("Deleted")
        }
    }
};
