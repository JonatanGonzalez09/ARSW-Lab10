const bigInt = require("big-integer");
const redis = require("redis");
const bluebird = require("bluebird");

//Promisify all the functions
bluebird.promisifyAll(redis);

//Create connection
const client = redis.createClient(
    {
        host: 'localhost',
        port: '6379'
    }
);

async function fibonacciExist(nth){
    let key = generateKey(nth);
    await client.existsAsync(key) === 1;
}

async function getFibonacci(nth){
    let key = generateKey(nth);
    await client.getAsync(key);
}

async function setFibonacci(nth, nthValue){
    let key = generateKey(nth);
    await client.setAsync(key, nthValue.toString());
}

function generateKey(nth){
    return `fibonacci:nth:${nth.toString()}`;
}

async function fibonacci(nth){
    //console.log("Enesimo nth: "+nth);
    let answer = bigInt.zero;

    if (nth < 0){
        throw "Must be greater than 0";
    }else if (nth === 0){
        answer = bigInt.zero;
    }else if (nth === 1 | nth === 2){
        answer = bigInt.one;;
    }else if (await fibonacciExist(nth)){
        answer = await getFibonacci(nth);
    }else{
        answer = (await fibonacci(nth-1)).add(await fibonacci(nth-2));;
        await setFibonacci(nth, answer)
    }
    //console.log("answer"+answer.toString());
    return answer;
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    let nth = req.body.nth;
    let answer = await fibonacci(nth);

    context.res = {
        body: answer.toString()
    }

};