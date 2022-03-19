let positive = []
let negative = []
let mixed = []
let neutral = []
let yearsArray = []

function buildSentimentGraph() {
    //initialize
    initSentimentArrays()

    // loop through 1999-2022
    for (let year = 1999; year < 2022; year++) {
        yearsArray.push(year)
        // create one average value for pos/neg/mixed/neutral
        // loop through returned Sentiment data and keep adding the values
        // if timestamp = year: increment counter
        let arraysIndex = year - 1999
        sentimentData.forEach(function(row){
            if(new Date(row.Timestamp).getFullYear() == year){
                console.log(year)
                positive[arraysIndex] = positive[arraysIndex] + row.Sentiment.SentimentScore.Positive
                negative[arraysIndex] = negative[arraysIndex] + row.Sentiment.SentimentScore.Negative
                mixed[arraysIndex] = mixed[arraysIndex] + row.Sentiment.SentimentScore.Mixed
                neutral[arraysIndex] = neutral[arraysIndex] + row.Sentiment.SentimentScore.Neutral
            }
        })
    }

    traces = [
        // x 1999 - 2022
        // y pos/neg/mixed/neutral
        { x: yearsArray, y: neutral, stackgroup: 'one', groupnorm: 'percent', name: "Neutral" },//neutral
        { x: yearsArray, y: mixed, stackgroup: 'one', name: "Mixed" },//mixed
        { x: yearsArray, y: positive, stackgroup: 'one', name: "Positive" },//positive
        { x: yearsArray, y: negative, stackgroup: 'one', name: "Negative" }//neg
    ];
    Plotly.newPlot('sentimentDiv', traces, { title: 'Sentiment Analysis regarding Earthquakes in Guardian Newspaper' });
}

function initSentimentArrays(){
    let finalYear = 2022
    let firstYear = 1999
    let currentYear = firstYear
    do{
        positive.push(0)
        negative.push(0)
        mixed.push(0)
        neutral.push(0)
        currentYear++
    }while(currentYear<finalYear)
}
