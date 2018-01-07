var mongoose = require('mongoose');
var api = {};
var model = mongoose.model('Goal');

api.getAll = function (req, res) {

    model.find({ userId: req.decodedUser.userId }).then(function (goals) {
        res.status(200).json(goals);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.create = function (req, res) {

    var goal = req.body;
    goal.userId = req.decodedUser.userId;

    model.create(goal).then(function (goal) {
        res.status(201).json(goal);
    }, function (error) {
        res.status(500).json(error);
    });
}

api.remove = function (req, res) {

    model.remove({ _id: req.params.id, userId: req.decodedUser.userId }).then(function () {
        res.sendStatus(204);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.getById = function (req, res) {

    model.findOne({ _id: req.params.id, userId: req.decodedUser.userId }).then(function (goal) {
        if (!goal) {
            res.sendStatus(404);
        } else {
            res.status(200).json(goal);
        }
    }, function (error) {
        res.status(500).json(error);
    });
};

api.update = function (req, res) {

    var newGoal = req.body;

    model.findOne({ _id: req.params.id, userId: req.decodedUser.userId }).then(function (goal) {
        if (!goal) {
            res.sendStatus(404);
        } else {
            model.findByIdAndUpdate(req.params.id, newGoal, { new: true }).then(function (updatedGoal) {
                res.status(200).json(updatedGoal);
            });
        }
    }, function (error) {
        res.status(500).json(error);
    });
};

module.exports = api;