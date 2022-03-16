//Generates the specified number of random sentiment data
function getDemoSentimentData(numItems){
    let sentimentArray = [];

    for(let i=0; i<numItems; i++){
        //Randomly generate sentiment
        let positiveSentiment = Math.random();
        let negativeSentiment = 1-positiveSentiment;

        //Add sentiment object to array
        let sentimentObject = {
            Sentiment: "UNDEFINED",
            SentimentScore: {
                Positive: positiveSentiment,
                Negative: negativeSentiment,
                Neutral: 0,
                Mixed: 0
            }
        }
        sentimentArray.push(sentimentObject);
    }

    //Return random sentiment data
    return sentimentArray;
}

