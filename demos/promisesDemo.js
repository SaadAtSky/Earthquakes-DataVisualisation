const { Console } = require("console")

//lambda function practice
function helloWorld(name){
    console.log("Hello "+name)
}

let helloWorld2 = (name) => {
    console.log("Hello "+name)
}

//async - allows to write promises/await - allows to wait for promises and promises
// let helloWorld3 = (name) => {
//     return (console.log("Hello "+name))//something that might take time
// }

// helloWorld3("Saad").then(
//     console.log("bye")
// )

let promise = new Promise(function(resolve,reject){
    setTimeout(function(){resolve("SAAD");},1000)
});
async function helloWorld5(){
    helloWorld(await promise)
    helloWorld("ENDD")
}

helloWorld5()