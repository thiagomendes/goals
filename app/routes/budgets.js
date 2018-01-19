module.exports = function (app) {

    var api = app.api.budgets;

    app.delete('/api/goals/:id/remove_budgets', api.removeBudgets);

    app.route('/api/goals/:goalId/budgets')
        .get(api.getAll)
        .post(api.create);

    app.route('/api/goals/:goalId/budgets/:id')
        .get(api.getById)
        .put(api.update)
        .delete(api.remove);
}