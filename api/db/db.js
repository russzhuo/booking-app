//db.js
require('dotenv').config()

const DB_URL=process.env.MONGO_URL


module.exports = function (success,error){
    if(typeof error !== 'function'){
        error=()=>{
            console.log('Database connection failed');

        }
    }

    const mongoose =require('mongoose')
    
    mongoose.connect(DB_URL);

    mongoose.connection.once('open',()=>{
        success();
    });

    mongoose.connection.on('error',()=>{
        error();
    })

    mongoose.connection.on('close',()=>{
        console.log('Database connection closed')
    })

}
