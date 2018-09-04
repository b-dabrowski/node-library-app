const _ = require('lodash');
const Book = require('./bookModel');

exports.params = function addCategoryToRequest(req, res, next, id) {
  Book.findById(id)
    .populate('category', 'id')
    .populate('addedBy', 'id')
    .populate('author', 'id')
    .exec()
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
  Book.find()
    .then((books) => {
      res.json({
        books
      });
    }, (err) => {
      next(err);
    });
};

exports.getCreated = function get(req, res, next) {
  const user = req.user;  

  Book.find({ addedBy: user.id })
    .then((books) => {
      res.json({
        books
      });
    }, (err) => {
      next(err);
    });
};

exports.getBorrowed = function get(req, res, next) {
  const user = req.user; 

  Book.find({ borrowedBy: user.id })
    .then((books) => {
      res.json({
        books
      });
    }, (err) => {
      next(err);
    });
};

exports.getByAuthor = function get(req, res, next) {
  const authorId = req.query.author; 

  Book.find({ author: authorId })
    .then((books) => {
      res.json({
        books
      });
    }, (err) => {
      next(err);
    });
};

exports.getOne = function getOne(req, res) {
  let book = req.book;
  const user = req.user;
  let isCurrentUserAddedBook = false;

  if (book.addedBy && user) {
    isCurrentUserAddedBook = book.addedBy.id === user.id;
  }

  book = book.toJson();
  book.canEdit = isCurrentUserAddedBook;
  res.json({
    book
  });
};

exports.put = function put(req, res, next) {
  const book = req.book;
  const update = req.body.book;

  _.merge(book, update);

  book.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      const updatedBook = saved.toJson();
      updatedBook.canEdit = true;

      res.json({
        book: updatedBook
      });
    }
  });
};

exports.post = function post(req, res, next) {
  const newBook = req.body.book;
  const user = req.user;

  newBook.addedBy = user.id;

  Book.create(newBook)
    .then((book) => {

      const createdBook = book.toJson();
      createdBook.canEdit = true;

      res.json({
        book: createdBook
      });
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
