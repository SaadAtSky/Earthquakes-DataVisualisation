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
/* Stores data in the database */
class DBInterface {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    connect() {
        //Put database connection code here
    }
    close() {
        //Close database connection here
    }
    storeData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve("Data stored: " + JSON.stringify(data));
                }, 1000);
            });
        });
    }
}
/* Downloads data from web service */
class DataDownloader {
    constructor(url) {
        this.url = url;
    }
    getDataFromWebService() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({ data: "Some data" });
                }, 500);
            });
        });
    }
}
/* Contains the main logic of the application */
class Main {
    constructor() {
        //Create instances of classes
        this.dbInterface = new DBInterface("root", "123");
        this.dataDownloader = new DataDownloader("www.example.com/api");
    }
    downloadData() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbInterface.connect();
            try {
                //Get promise to download data
                let downloadPromise = this.dataDownloader.getDataFromWebService();
                //Execute promise and wait for result.
                let data = yield downloadPromise;
                console.log("Data downloaded: " + JSON.stringify(data));
                //Pass data to database to store
                let storeDataPromise = this.dbInterface.storeData(data);
                let result = yield storeDataPromise;
                console.log("Result: " + result);
            }
            catch (err) {
                console.error("Error occurred: " + err);
            }
            finally {
                this.dbInterface.close();
            }
        });
    }
}
let main = new Main();
main.downloadData();
