{
    /* Music data available here: https://data.world/kcmillersean/billboard-hot-100-1958-2017
     */

    //File details
    const folder:string = "kcmillersean-billboard-hot-100-1958-2017";
    const featuresFile:string = "Hot 100 Audio Features.csv";
    const hot100File:string = "Hot Stuff.csv";

    //Libraries
    const csv = require ('csv-parser');
    const fs = require('fs');

    //Holds contents of audio features file
    const songs = [];

    //Data about each song
    const songData = {};

    //Top 100 songs by date from file
    const top100 = [];

    //Top 100 processed into features, such as chart position, danceability
    const top100Features = {};

    //Time series of features with UNIX timestamp.
    // This is negative at the start because some dates are prior to 1970
    const timeSeries = [];

    //Read in features file
    function readSongFeatures(){
        console.log("Reading song features...");
        fs.createReadStream(folder + "/" + featuresFile)
            .pipe(csv())
            .on('data', (data) => {
                //Store in array for easier processing
                songs.push(data);

            })
            .on('end', () => {
                //console.log(songs);
                processSongFeatures();
            });
    }

    //Extract the danceability for each week as an example
    function processSongFeatures(){
        console.log("Processing song features...");
        for(let song of songs){
            songData[song.song_id] = {danceability: parseFloat(song.danceability)};
        }
        //console.log(songData);

        //Call function to read in billboard positions
        readTop100();
    }


    //Reads in chart position data
    function readTop100(){
        console.log("Reading top 100");
        fs.createReadStream(folder + "/" + hot100File)
            .pipe(csv())
            .on('data', (data) => {
                //Store in array for easier processing
                top100.push(data);

            })
            .on('end', () => {
                //console.log(top100);
                processTop100();
            });
    }

    //Processes chart data to extract total danceability per week.
    function processTop100(){
        console.log("Processing top 100");
        for(let chartPos of top100){
            if(songData[chartPos.SongID] !== undefined){
                //Add the date if we don't have a record already
                if (top100Features[chartPos.WeekID] === undefined)
                    top100Features[chartPos.WeekID] = {danceability: 0.0};

                //Extract the danceability. Could also extract genre, etc.
                let danceability = songData[chartPos.SongID].danceability;

                //Sum up the danceability
                if(!Number.isNaN(danceability)) {
                    //Add up the danceability for the song
                    top100Features[chartPos.WeekID].danceability += danceability;
                }
            }
        }
        //console.log(top100Features);
        //Convert to time series
        convertToTimeSeries();
    }

    //Converts to a time ordered array suitable for plotting.
    function convertToTimeSeries(){
        let dates = Object.keys(top100Features);
        for(let date of dates){
            let dt = new Date(date);
            //console.log(dt.valueOf());
            timeSeries.push({TimeStamp: + dt.valueOf(), Data: {Danceability: top100Features[date].danceability }})
        }

        //Sort array by time
        timeSeries.sort((item1, item2)=>{
            return item1.TimeStamp - item2.TimeStamp;
        });

        console.log(timeSeries);
    }


    //Call first function to read in song features
    readSongFeatures();
}

