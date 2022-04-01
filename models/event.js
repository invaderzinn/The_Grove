const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    first: String,
    last: String,
    email: String,
    phone: Number,
    guests: Number,
    date: String,
    type: String,
    description: String


});

module.exports = mongoose.model('Event', EventSchema);