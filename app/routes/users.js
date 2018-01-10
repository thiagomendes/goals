module.exports = function (app) {

    var api = app.api.users;
    app.post('/api/users/auth', api.authenticate);
    app.use('/api/*', api.validateToken);
}