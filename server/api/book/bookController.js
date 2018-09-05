/* eslint max-statements: 0 */

const _ = require('lodash');
const Book = require('./bookModel');

exports.params = function addCategoryToRequest(req, res, next, id) {
  Book.findById(id)
    .populate('category')
    .populate('addedBy', 'id')
    .populate('borrowedBy', 'id')
    .populate('author')
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

  Book.find({
      addedBy: user.id
    })
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

  Book.find({
      borrowedBy: user.id
    })
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

  Book.find({
      author: authorId
    })
    .then((books) => {
      res.json({
        books
      });
    }, (err) => {
      next(err);
    });
};

exports.getByCategory = function get(req, res, next) {
  const categoryId = req.query.category;

  Book.find({
      category: categoryId
    })
    .then((books) => {
      res.json({
        books
      });
    }, (err) => {
      next(err);
    });
};

exports.getOneNotLogged = function getOneNotLogged(req, res) {
  const book = req.book;

  res.json({
    book
  });
};

exports.getOne = function getOne(req, res) {
  let book = req.book;
  const user = req.user;
  let isCurrentUserAddedBook = false;
  let isCurrentUserBorrowedBook = false;

  if (user && book.borrowedBy) {
    isCurrentUserBorrowedBook = book.borrowedBy.id === user.id;
  }

  if (book.addedBy) {
    isCurrentUserAddedBook = book.addedBy.id === user.id;
  }

  book = book.toJson();
  book.canEdit = isCurrentUserAddedBook;
  book.currentUserBorrowed = isCurrentUserBorrowedBook;
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

exports.validateData = function validateData(req, res, next) {
  const newBook = req.body.book;

  let isDataValid = true;
  const errors = {};

  if (!newBook.title.length) {
    errors.title = ['field required'];
    isDataValid = false;
  }

  if (!newBook.category.length) {
    errors.category = ['field required'];
    isDataValid = false;
  }

  if (!newBook.author.length) {
    errors.author = ['field required'];
    isDataValid = false;
  }

  if (!newBook.description.length) {
    errors.description = ['field required'];
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

exports.borrowBook = function borrowBook(req, res, next) {
  const bookToBorrow = req.book;
  const user = req.user;

  bookToBorrow.borrowedBy = user.id;
  bookToBorrow.available = false;
  bookToBorrow.currentUserBorrowed = true;

  bookToBorrow.save((err, borrowedBook) => {
    if (err) {
      next(err);
    } else {
      res.json({
        book: borrowedBook
      });
    }
  });
};

exports.returnBook = function returnBook(req, res, next) {
  const bookToReturn = req.book;

  bookToReturn.borrowedBy = null;
  bookToReturn.available = true;
  bookToReturn.currentUserBorrowed = false;

  bookToReturn.save((err, returnedBook) => {
    if (err) {
      next(err);
    } else {
      res.json({
        book: returnedBook
      });
    }
  });
};