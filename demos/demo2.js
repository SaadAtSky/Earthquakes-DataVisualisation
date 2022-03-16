"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const demo_1 = require("./demo");
let greeter2 = new demo_1.Greeter();
let wd = { humidity: 22, visibility: "ok" };
greeter2.processData(wd);
