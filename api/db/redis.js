const redis= require("redis")
require('dotenv').config()

const host = process.env.REDIS_HOST|| "127.0.0.1";
const port = process.env.REDIS_PORT|| "6379";
 
class Redis {
    constructor() {
        this.redisClient = redis.createClient({
            url: `redis://${host}:${port}`,
            legacyMode: true
        });
 
        // configure redis event listeners
        this.redisClient.on('ready', function() {
            console.log('Redis Client: ready')
        })
        
        // callback event for connecting to Redis server
        this.redisClient.on('connect', function () {
            console.log(new Date(), 'redis is now connected!');
        });
        
        this.redisClient.on('reconnecting', function () {
            console.log(new Date(), 'redis reconnecting', arguments);
        });
        
        this.redisClient.on('end', function () {
            console.log('Redis Closed!');
        });
        
        this.redisClient.on('warning', function () {
            console.log('Redis client: warning', arguments);
        });
 
        this.redisClient.on('error', err => {
            console.log('Redis Error ' + err);
        });
        
        // see if redis is connected
        if (this.redisClient.isOpen) {
            console.log('rredis is now connected!')
        } else {
            this.redisClient.connect().catch(error => console.log(error));
        }
    }
 
    async contect() {
        await this.redisClient.connect().catch(error => console.log(error));
    }
 
    quit() {
        this.redisClient.quit();
    }
 
    async exists(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.exists(key, (err, result) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(result);
            })
        })
    }
 

    async set(key, value, exprires) {
        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }
        return new Promise((resolve, reject)  => {
            this.redisClient.set(key, value, (err, result) => {
                if (err) {
                    reject(err);
                }
                if (!isNaN(exprires)) {
                    this.redisClient.expire(key, exprires);
                }
                resolve(result);
            })
        })
    }
 
    async get(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        })
    }
 
    async remove(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.del(key, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
    }
 
    // push the given value to the right end of the list and returns the current length of the list
    async rPush(key, list, exprires) {
        return new Promise((resolve, reject) => {
            this.redisClient.rPush(key, list, (err, length) => {
                if (err) {
                    reject(err);
                }
                if (!isNaN(exprires)) {
                    this.redisClient.exports(key, exprires);
                }
                resolve(length);
            })
        })
    }
 
    // Querying the values of a list
    async lrange(key, startIndex = 0, stopIndex = -1) {
        return new Promise((resolve, reject) => {
            this.redisClient.lRange(key, startIndex, stopIndex, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result)
            })
        })
    }
 
    // Remove n items with the value "value" from the list.
    async lrem(key, n = 1, value) {
        return new Promise((resolve, reject) => {
            this.redisClient.lrem(key, n, value, (err, result) => {
                if (err) {
                    return err
                }
                resolve(result);
            })
        });
    }
 
}
 
module.exports = new Redis();