// declare separate arrays for each emotion and an array to store values for the y-axis (yearly)
let positive = []
let negative = []
let mixed = []
let neutral = []
let yearsArray = []

function buildSentimentGraph() {
    //initialize arrays with default value of '0'
    initSentimentArrays()

    // create layout
    var layout = {
        title: 'Sentiment Analysis regarding Earthquakes in Guardian Newspaper',
        xaxis: {
            title: 'Years',
        },
        yaxis: {
            title: 'Sentiment (%)',
        },
        width: 1000,
        height: 500,
    };

    // loop through 1999-2022 and build a single value of each emotions 
    // for that array (average not needed and its automatic for this plot)
    for (let year = 1999; year < 2022; year++) {
        yearsArray.push(year)
        // create one average value for pos/neg/mixed/neutral
        // loop through returned Sentiment data and keep adding the values
        // if timestamp = year: increment counter
        let arraysIndex = year - 1999
        sentimentData.forEach(function (row) {
            if (new Date(row.Timestamp).getFullYear() == year) {
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
    Plotly.newPlot('sentimentDiv', traces, layout);
}

function initSentimentArrays() {
    let finalYear = 2022
    let firstYear = 1999
    let currentYear = firstYear
    do {
        positive.push(0)
        negative.push(0)
        mixed.push(0)
        neutral.push(0)
        currentYear++
    } while (currentYear < finalYear)
}
