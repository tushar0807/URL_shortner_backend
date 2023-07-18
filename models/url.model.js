const mongoose = require('mongoose');
const shortid = require('shortid');

const URLschema = new mongoose.Schema({
    longUrl : String ,
    shortUrl : String ,
    code : {
        type : String ,
        default : shortid.generate()
    },
    date : {
        type : String ,
        default : Date.now
    }
});

module.exports = mongoose.model('Url' , URLschema);