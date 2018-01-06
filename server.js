var http = require('http');
var express = require('./config/express');
var mongodb = require('./config/mongodb');
var server = http.createServer(express);

server.listen(3000, function() {
    console.log('Server started');
});