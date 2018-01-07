module.exports = function (app) {

    var api = app.api.goals;

    app.route('/goals')
        .get(api.getAll)
        .post(api.create);

    app.route('/goals/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);
}