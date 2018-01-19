var mongoose = require('mongoose');
var api = {};
var model = mongoose.model('Budget');

api.create = function (req, res) {
    var budget = req.body;
    budget.goalId = req.params.goalId;

    model.create(budget).then(function (budget) {
        res.status(201).json(budget);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.removeBudgets = function (req, res) {
    model.remove({ goalId: req.params.id }).then(function () {
        res.sendStatus(204);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.getAll = function (req, res) {
    model.find({ goalId: req.params.goalId }).then(function (budgets) {
        res.status(200).json(budgets);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.remove = function (req, res) {
    model.remove({ _id: req.params.id }).then(function () {
        res.sendStatus(204);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.getById = function (req, res) {

};

api.update = function (req, res) {

};

module.exports = api;