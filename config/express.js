var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.use(express.static('./public'));
app.use(bodyParser.json());

// habilitando HTML5MODE
app.all('/app/*', function (req, res) {
    res.sendFile(path.resolve('public/index.html'));
});

consign({ cwd: 'app' })
    .include('models')
    .then('api')
    .then('routes/users.js')
    .then('routes')
    .into(app);

module.exports = app;