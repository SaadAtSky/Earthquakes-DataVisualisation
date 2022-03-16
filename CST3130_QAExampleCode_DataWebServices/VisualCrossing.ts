{
    interface VisualCrossing {
        days:Array<Day>
    }

    interface Day {
        datetime:string,
        humidity:number
    }

    const moment = require('moment');

    //Reads keys from .env file
    const dotenv = require('dotenv');
    dotenv.config();

    //Axios will handle HTTP requests to web service
    const axios = require ('axios');

    class VisualCrossing {
        baseUrl: string = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

        async downloadWeatherData(location: string): Promise<void> {
            //Create moment date, which will enable us to add days easily.
            let date = moment('2015-01-01');

            //Work forward month by month from start date
            for (let month:number = 0; month < 12; ++month) {
                //Start with base url
                let url: string = this.baseUrl + location + "/";

                //Add start date
                url += date.format("YYYY-MM-DD") + "/";

                //Increase the number of days
                date.add(1, 'months');

                //Add end date
                url += date.format("YYYY-MM-DD") + "?";

                //Add query parameters
                url += "unitGroup=metric&include=days&contentType=json";

                //Add Key
                url += "&key=" + process.env.VISUAL_CROSSING_KEY;

                //Log URL
                console.log(url);

                try {
                    //Pull data
                    let data:VisualCrossing = (await axios.get(url)).data;

                    //Output humidity for each day
                    for(let day of data.days){
                        console.log(day.datetime + ". Humidity: " + day.humidity);
                    }
                }
                catch(err){
                    console.error("Failed to fetch data: " + err);
                }

            }

//        url += "access_key=" + process.env.FIXERIO_API_KEY;

        }


    }

    let vc: VisualCrossing = new VisualCrossing();
    vc.downloadWeatherData("London");

// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London/2021-04-05/2022-01-27?unitGroup=metric&include=days&key=6P5NAJ92RCYFPE3GNZV2547SG&contentType=json

}