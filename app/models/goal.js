var mongoose = require('mongoose');

var schema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    totaCost: {
        type: Number,
        require: true
    },
    createDate: {
        type: Date,
        require: true
    },
    targetDate: {
        type: Date,
        require: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        require: true
    }
});

var model = mongoose.model('Goal', schema);