const mongoose = require('mongoose');

const habitSchema  = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    dates:[{
        date:String,
        complete:String
    }],

},{timestamps:true});

module.exports = mongoose.model('Habit', habitSchema);