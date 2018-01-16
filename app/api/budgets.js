var mongoose = require('mongoose');
var api = {};
var model = mongoose.model('Budget');

api.create = function (req, res) {

};

api.getAll = function (req, res) {
    model.find({ goalId: req.params.goalId }).then(function (budgets) {
        res.status(200).json(budgets);
    }, function (error) {
        res.status(500).json(error);
    });
};

api.remove = function (req, res) {

};

api.getById = function (req, res) {

};

api.update = function (req, res) {

};

module.exports = api;