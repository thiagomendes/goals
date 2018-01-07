module.exports = function (app) {

    var api = app.api.goals;

    app.route('/goals')
        .get(api.getAll)
        .post(api.create);
}