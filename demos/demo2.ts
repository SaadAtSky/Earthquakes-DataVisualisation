import { Greeter, WeatherData } from "./demo";

let greeter2:Greeter = new Greeter()
let wd:WeatherData = {humidity:22,visibility:"ok"}
greeter2.processData(wd)