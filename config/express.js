var express = require('express');
var consign = require('consign');
var bodyParse = require('body-parser');
var app = express();

app.use(express.static('./public'));
app.use(bodyParse.json());

consign({cwd: 'app'}).include('models').then('api').then('routes').into(app);

module.exports = app;