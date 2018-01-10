module.exports = function (app) {

    var api = app.api.budgets;

    app.route('/api/budgets')
        .get(api.getAll)
        .post(api.create);

    app.route('/api/budgets/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);
}