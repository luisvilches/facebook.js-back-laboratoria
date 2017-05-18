const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Post = new Schema({
    text: String,
    img: String,
    by: String,
    type: String,
    date: Date
});

module.exports = mongoose.model('Post',Post);