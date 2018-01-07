var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

consign({ cwd: 'app' })
    .include('models')
    .then('api')
    .then('routes/users.js')
    .then('routes')
    .into(app);

module.exports = app;