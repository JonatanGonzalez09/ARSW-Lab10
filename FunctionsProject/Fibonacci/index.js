var bigInt = require("big-integer");
var redis = require("redis");
var bluebird = require("bluebird");

//Promisify all the functions
bluebird.promisifyAll(redis);

//Create connection
const client = redis.createClient(
    {
        host: 'localhost',
        port: '6379'
    }
);

//Deploy in Azure
/* const client = redis.createClient(
    6380,'redislab10.redis.cache.windows.net',
    {
        auth_pass: 'UzxfcayyQsPl7dkGlaQxoMN9WRZQAwnLCPfElaqDMqQ=',
        tls:{
            servername: 'redislab10.redis.cache.windows.ne'
        }
    }
); */


async function fibonacci(nth){
    var ans = null;
    if (nth < 0){
        throw 'must be greater than 0'
    }else if (nth === 0){
        ans = bigInt.zero;
    }else if(nth === 1 || nth === 2){
        ans =  bigInt.one;
    }else if(await fibonacciExist(generateKey(nth))){
        return (await getFibonacci(generateKey(nth)));
    }
    else{
        ans = (await fibonacci(nth-1)).add((await fibonacci(nth-2)));
        await setFibonacci(generateKey(nth),ans.toString());
    }
    return ans;
}

function generateKey(nth){
    return `fibonacci:nth:${nth.toString()}`;
}

async function fibonacciExist(key){
    return (await client.existsAsync(key))=== 1;
}

async function getFibonacci(key){
    return bigInt(await client.getAsync(key));
}

async function setFibonacci(key,value){
    await client.setAsync(key,value);
}

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    let nth = req.body.nth
    answer = await fibonacci(nth);

    context.res = {
        body: answer.toString()
    };
}