const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
    name: String,
    lastname: String,
    mail: String,
    pass: String,
    date: Date
});

module.exports = mongoose.model('User',User);