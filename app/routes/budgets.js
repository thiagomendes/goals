module.exports = function (app) {

    var api = app.api.budgets;

    app.route('/budgets')
        .get(api.getAll)
        .post(api.create);

    app.route('/budgets/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);
}