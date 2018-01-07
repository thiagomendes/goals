var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var api = {};
var model = mongoose.model('User');
var secret = 'atireiopaunogato';
var xAccessToken = 'x-access-token';

api.authenticate = function (req, res) {
    model.findOne({ email: req.body.email, password: req.body.password })
        .then(function (user) {
            if (!user) {
                res.sendStatus(401);
            } else {
                user.password = '********';

                var token = jwt.sign({ userId: user._id, userEmail: user.email }, secret, {
                    expiresIn: (60 * 30)
                });

                res.set(xAccessToken, token);
                res.status(200).json(user);
            }
        }, function (error) {
            res.status(500).json(error);
        });
};

api.validateToken = function (req, res, next) {
    var token = req.headers[xAccessToken];

    if (token) {
        jwt.verify(token, secret, function (error, decoded) {
            if (error) {
                console.log('Invalid Token: ' + error);
                res.sendStatus(401);
            } else {
                req.decodedUser = decoded;
                next();
            }
        });
    } else {
        console.log('Token Not Informed');
        res.sendStatus(403);
    }
}

module.exports = api;