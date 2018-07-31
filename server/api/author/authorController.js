const _ = require('lodash');
const Author = require('./authorModel');

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
      res.json(authors);
    }, (err) => {
      next(err);
    });
};

exports.getOne = function getOne(req, res, next) {
  const author = req.author;
  res.json(author);
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
