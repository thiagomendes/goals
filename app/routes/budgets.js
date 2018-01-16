module.exports = function (app) {

    var api = app.api.budgets;

    app.get('/api/:goalId/budgets', api.getAll);

    app.post('/api/budgets', api.create);

    app.route('/api/budgets/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);
}