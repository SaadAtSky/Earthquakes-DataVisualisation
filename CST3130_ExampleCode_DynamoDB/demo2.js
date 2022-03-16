"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let date = new Date("01-02-2020");
console.log(date.valueOf()); //UNIX timestamp
let promiseArray = [];
let resultArray = [];
let promiseIdx = 0;
function executePromise() {
    return __awaiter(this, void 0, void 0, function* () {
        resultArray[promiseIdx] = yield promiseArray[promiseIdx];
        promiseIdx++;
        if (promiseIdx < promiseArray.length)
            setTimeout(executePromise, 1000);
    });
}
executePromise();
