const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/habit-tracker');

const db = mongoose.connection;

db.on('error', console.error.bind(console.log(`Error in connecting to Data Base`)));

db.once('open' , () => {
    console.log("Connected to Data Base  :: MongoDB");
});

module.exports = db;