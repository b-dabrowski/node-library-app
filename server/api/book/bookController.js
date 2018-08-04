const _ = require('lodash');
const Book = require('./bookModel');

exports.params = function addCategoryToRequest(req, res, next, id) {
  Book.findById(id)
    .then((book) => {
      if (!book) {
        next(new Error('No book with that id'));
      } else {
        req.book = book;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = function get(req, res, next) {
  Book.find({})
    .then((book) => {
      res.json(book);
    }, (err) => {
      next(err);
    });
};

exports.getOne = function getOne(req, res) {
  const book = req.book;
  res.json(book);
};

exports.put = function put(req, res, next) {
  const book = req.book;
  const update = req.body;

  _.merge(book, update);

  book.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function post(req, res, next) {
  const newBook = req.body;

  Book.create(newBook)
    .then((book) => {
      res.json(book);
    }, (err) => {
      next(err);
    });
};

exports.delete = function remove(req, res, next) {
  const bookToRemove = req.book;
  bookToRemove.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
