module.exports = function (app) {

    var api = app.api.users;
    app.post('/users/auth', api.authenticate);
    app.use('/*', api.validateToken);
}