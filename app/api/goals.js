var mongoose = require('mongoose');
var api = {};
var model = mongoose.model('Goal');

api.getAll = function (req, res) {

    model.find({userId:req.decodedUser.userId}).then(function (goals) {
        res.status(200).json(goals);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.create = function (req, res) {
    var goal = req.body;
    goal.userId = req.decodedUser.userId;

    model.create(goal).then(function (goal) {
        res.status(200).json(goal);
    }, function (error) {
        res.status(500).json(error);
    });
}

module.exports = api;