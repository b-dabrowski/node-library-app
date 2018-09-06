/* eslint consistent-return: 0 */
/* eslint max-statements: 0 */

const User = require('./userModel');
const _ = require('lodash');
const signToken = require('../../auth/auth').signToken;

exports.params = function (req, res, next, id) {
    User.findById(id)
        .select('-password')
        .exec()
        .then((user) => {
            if (!user) {
                next(new Error('No user with that id'));
            } else {
                req.user = user;
                next();
            }
        }, (err) => {
            next(err);
        });
};

exports.get = function (req, res, next) {
    User.find({})
        .select('-password')
        .exec()
        .then((users) => {
            res.json(users.map(user => user.toJson()));
        }, (err) => {
            next(err);
        });
};

exports.getOne = function (req, res, next) {
    const user = req.user.toJson();
    res.json(user.toJson());
    next();
};

exports.put = function (req, res, next) {
    const user = req.user;

    const fieldsToUpdate = req.body.user;

    _.merge(user, fieldsToUpdate);

    user.save((err, saved) => {
        if (err) {
            next(err);
        } else {
            res.json({
                user: saved.toJson()
            });
        }
    });
};

exports.validate = function (req, res, next) {
    const user = req.body.user;
  
    let isDataValid = true;
    const errors = {};
  
    if (!user || !user.username || !user.username.length) {
      errors.username = ['field is required'];
      isDataValid = false;
    }
  
    if (!user || !user.password || !user.password.length) {
      errors.password = ['field is required'];
      isDataValid = false;
    }
  
    if (isDataValid) {
      next();
    } else {
      res.status(422).json({
        errors
      });
    }
  };

exports.post = function (req, res, next) {
    const newUser = new User(req.body.user);

    newUser.save((err, user) => {
        if (err) {
            return next(err);
        }

        const token = signToken(user.id);
        const username = user.username;

        res.json({
            user: {
                token,
                username
            }
        });
    });
};

exports.delete = function (req, res, next) {
    req.user.remove((err, removed) => {
        if (err) {
            next(err);
        } else {
            res.json(removed.toJson());
        }
    });
};

exports.me = function (req, res) {
    res.json({
        user: req.user.toJson()
    });
};

exports.getProfile = function (req, res, next) {
    const username = req.params.username;
    User.findOne({
            username
        })
        .select('-password')        
        .then((user) => {
            if (!user) {
                next(new Error('No user with that username'));
            } else {
                req.user = user;
                res.json({
                    profile: user.toJson()
                });
            }
        }, (err) => {
            next(err);
        });
};
