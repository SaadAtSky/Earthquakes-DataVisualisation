import { getNameOfDeclaration } from "typescript"
export interface WeatherData {
    humidity:number,
    visibility:string,
}
export class Greeter{
    constructor(){

    }
    async getNameOfDeclaration(name:string):Promise<string>{
        return name
    }
    processData(data:WeatherData):void{
        console.log(data.humidity)
    }
    sayHello(name:string):void{
        console.log("hello " + name)
    }
}

let greeter:Greeter = new Greeter()
greeter.sayHello("Saad")//pickup error if parameter is int for e,g

let greeter1:Greeter = new Greeter()
greeter1.processData({humidity: 33, visibility: "Good"})