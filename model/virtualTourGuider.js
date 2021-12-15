const mongoose = require('mongoose');

const virtulGuiderSchema = new mongoose.Schema({
    guests: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    groupType: {
        type: String
    }
})

const VGuider = mongoose.model('VGuider', virtulGuiderSchema);
module.exports = VGuider;
