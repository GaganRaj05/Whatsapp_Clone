const redis = require('redis');
const redisClient = redis.createClient({
    url:process.env.REDIS_URL
});

redisClient.on("error",(err)=> {
    console.log("error occured while connecting to redis",err);
})

redisClient.connect().then(()=>{
    console.log("Connected to redis",);
})
module.exports = redisClient;