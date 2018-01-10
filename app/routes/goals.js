module.exports = function (app) {

    var api = app.api.goals;

    app.route('/api/goals')
        .get(api.getAll)
        .post(api.create);

    app.route('/api/goals/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);
}