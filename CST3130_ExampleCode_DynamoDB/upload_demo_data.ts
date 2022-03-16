namespace UploadDemo {
    async function uploadData() {
        const AWS = require("aws-sdk");

        AWS.config.update({
            region: "us-east-1",
            endpoint: "https://dynamodb.us-east-1.amazonaws.com"
        });

        //Create new DocumentClient
        let docClient = new AWS.DynamoDB.DocumentClient();

        //Create Date class so we can obtain a starting timestamp
        let date: Date = new Date();
        let startTimestamp = date.getTime();

        let currencies: Array<{ name: string, averagePrice: number }> = [
            {name: "bitcoin", averagePrice: 3800},
            {name: "ethereum", averagePrice: 128},
            {name: "litecoin", averagePrice: 31},
            {name: "tron", averagePrice: 0.03}
        ];

        //Add dummy data for four currencies
        for(let curr of currencies){

            //Add ten lots of data for each currency
            for (let ts: number = 0; ts < 10; ++ts) {
                //Create parameters holding randomized data
                let params = {
                    TableName: "CryptoCurrency",
                    Item: {
                        "CurrencySymbol": curr.name,
                        "CurrencyTimeStamp": startTimestamp + ts,
                        "Price": curr.averagePrice * (1 + 0.1 * (Math.random() - 0.5))
                    }
                };

                //Add data to database
                try {
                    let result = await docClient.put(params).promise();
                    console.log("Currency added to table:", curr.name);
                } catch (err) {
                    console.error("Unable to add currency", curr.name);
                    console.error("Error JSON:", JSON.stringify(err));
                }
            }
        }
    }
    uploadData();
}
