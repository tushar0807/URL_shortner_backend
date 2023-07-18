const mongoose = require("mongoose");
require('dotenv').config()

const dbURL = process.env.MONGO_URI
console.log('dbURl ', dbURL)

const connectToDB = async ()=>{
    
    try{
        console.log('trying...')
        await mongoose.connect(dbURL , {
            useNewUrlParser : true
        });
        console.log('connected to database')
    }catch(err){
        console.log(err.message , 'connection failed')
        process.exit(1);
    }
}

module.exports = connectToDB