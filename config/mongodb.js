var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/goalsdb');

mongoose.connection.on('connected', function () {
    console.log("MongoDB Connected");
});

mongoose.connection.on('disconnected', function () {
    console.log('MongoDB Disconnected');
});

mongoose.connection.on('error', function (error) {
    console.log('MongoDB Connection ERROR: ' + error);
});

process.on('SIGINT', function () {
    var connectionState = mongoose.connection.readyState;

    if (connectionState == 2 || connectionState == 1) {
        mongoose.connection.close();
    }

    console.log('Application ended');
    process.exit(0);
});

module.exports = mongoose;