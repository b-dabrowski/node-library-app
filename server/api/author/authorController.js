const _ = require('lodash');
const Author = require('./authorModel');
const User = require('../user/userModel');

exports.params = function addAuthorToRequest(req, res, next, id) {
  Author.findById(id)
    .then((author) => {
      if (!author) {
        next(new Error('No author with that id'));
      } else {
        req.author = author;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = function get(req, res, next) {
  Author.find({})
    .then((authors) => {
      res.json({ authors });
    }, (err) => {
      next(err);
    });
};

exports.getOne = function getOne(req, res) {
  const author = req.author;
  res.json({ author });
};

exports.put = function put(req, res, next) {
  const author = req.author;
  const update = req.body;

  _.merge(author, update);

  author.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function post(req, res, next) {
  const newAuthor = req.body;

  Author.create(newAuthor)
    .then((author) => {
      res.json(author);
    }, (err) => {
      next(err);
    });
};

exports.delete = function remove(req, res, next) {
  const authorToRemove = req.author;
  authorToRemove.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};

exports.follow = function follow(req, res, next) {
  const user = req.user;
  let author = req.author;

  User.findById(user.id)
    .then((user) => {
      user.followedAuthors.push(author.id);
      user.save((err, updatedUser) => {
        if (err) {
          next(err);
        } else {
          author = author.toJson();
          author.isUserFollowing = true;
          res.json(author);
        }
      });          
    }, (err) => {
      next(err);
    });
};

exports.unfollow = function follow(req, res, next) {
  const user = req.user;
  const author = req.author;

  User.findById(user.id)
    .then((user) => {
      user.followedAuthors.remove(author.id);
      user.save((err, updatedUser) => {
        if (err) {
          next(err);
        } else {          
          author.isUserFollowing = false;
          res.json(author);
        }
      });          
    }, (err) => {
      next(err);
    });
};

exports.getAuthorFollowingInfo = function getAuthorFollowingInfo(req, res, next) {
  const user = req.user;
  let author = req.author;

  User.findById(user.id)
        .select('-password')
        .populate({
            path: 'followedAuthors',
            model: 'author',
        })            
        .exec()
        .then((user) => {
            if (!user) {
                next(new Error('No author with that id'));
            } else {                                
                const followedAuthor = _.find(user.followedAuthors, followedAuthor => followedAuthor.id === author.id);                                

                if (followedAuthor) {
                  author = author.toJson();
                  author.isUserFollowing = true;
                  res.json(author);
                } else {
                  author = author.toJson();
                  author.isUserFollowing = false;
                  res.json(author);
                }            
            }
        }, (err) => {
            next(err);
        });
};
