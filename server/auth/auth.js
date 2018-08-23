/* eslint no-prototype-builtins: 0 */
/* eslint object-shorthand: 0 */
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const checkToken = expressJwt({
    secret: config.secrets.jwt
});
const User = require('../api/user/userModel');

exports.decodeToken = function () {
    return function (req, res, next) {
        if (req.query && req.headers.authorization) {
            req.headers.authorization = `Bearer ${req.headers.authorization}`;
        }

        checkToken(req, res, next);
    };
};

exports.getFreshUser = function () {
    return function (req, res, next) {
        User.findById(req.user._id)
            .then((user) => {
                if (!user) {
                    res.status(401).send('Unauthorized');
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.verifyUser = function () {
    return function (req, res, next) {

        if (!req.body.user) {
            res.status(400).send('You need a username and password');
            return;
        }
        
        const username = req.body.user.username;
        const password = req.body.user.password;

        if (!username || !password) {
            res.status(400).send('You need a username and password');
            return;
        }

        User.findOne({
                username: username
            })            
            .then((user) => {
                if (!user) {                    
                    res.status(422).json({
                        errors: {
                            'User': ['No user with the given username']
                        }
                    });
                } else if (!user.password) {
                    res.status(422).json({
                        errors: {
                            'Password': ['User has no password']
                        }
                    });
                } else if (!user.authenticate(password)) {
                    res.status(422).json({
                        errors: {
                            'Password': ['Wrong password']
                        }
                    });
                } else {
                    req.user = user;
                    next();
                }
            }, (err) => {
                next(err);
            });
    };
};

exports.signToken = function (id) {
    return jwt.sign(
        {
            _id: id
        },
        config.secrets.jwt, {
            expiresIn: config.expireTime
        }
    );
};
