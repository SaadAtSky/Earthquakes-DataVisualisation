let date  = new Date("01-02-2020");
console.log(date.valueOf());//UNIX timestamp

interface Data {
    val:number
    name:string
}

let promiseArray:Array<Promise<Data>>  = [];
let resultArray:Array<Data> = [];
let promiseIdx:number = 0;

async function executePromise(){
    resultArray[promiseIdx] = await promiseArray[promiseIdx];
    promiseIdx++;

    if(promiseIdx < promiseArray.length)
        setTimeout(executePromise, 1000);
}

executePromise();

