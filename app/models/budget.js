var mongoose = require('mongoose');

var schema = mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: true
    },
    expectedDate: {
        type: Date,
        require: true
    },
    status: {
        type: Number,
        require: true
    },
    goalId: {
        type: mongoose.Schema.ObjectId,
        require: true
    }
});

var model = mongoose.model('Budget', schema);