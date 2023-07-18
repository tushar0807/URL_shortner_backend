const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
    code : String ,
    totalClicks : Number
});

module.exports = mongoose.model('Stats' , StatsSchema);