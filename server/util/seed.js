const _ = require('lodash');
const User = require('../api/user/userModel');
const Category = require('../api/category/categoryModel');
const Author = require('../api/author/authorModel');
const Book = require('../api/book/bookModel');
const logger = require('./logger');

logger.log('Seeding the Database');

const categories = [
  { name: 'categoryA' },
  { name: 'categoryB' },
  { name: 'categoryC' },
];

const authors = [
  { name: 'authorA', surname: 'surnameA' },
  { name: 'authorB', surname: 'surnameB' },
  { name: 'authorC', surname: 'surnameC' },
];

const books = [
  { title: 'titleA', description: 'descriptionA' },
  { title: 'titleB', description: 'descriptionB' }
];

const users = [
  { username: 'userA', password: 'test' },
  { username: 'userB', password: 'test' },
  { username: 'userC', password: 'test', role: 'admin' }
];

const createDoc = (model, doc) => new Promise((resolve, reject) => {
  new model(doc).save((err, saved) => (err ? reject(err) : resolve(saved)));
});

const cleanDB = () => {
  logger.log('... cleaning the DB');
  const cleanPromises = [Author, Category, Book]
    .map(model => model.remove().exec());
  return Promise.all(cleanPromises);
};

const createUsers = function(data) {

  const promises = users.map(user => createDoc(User, user));

  return Promise.all(promises)
    .then(createdUsers => _.merge({ users: createdUsers }, data || {}));
};

const createCategories = (data) => {
  const promises = categories.map(category => createDoc(Category, category));

  return Promise.all(promises)
    .then(createdCategories => _.merge({ categories: createdCategories }, data || {}));
};

const createAuthors = (data) => {
  const promises = authors.map(author => createDoc(Author, author));

  return Promise.all(promises)
    .then(createdAuthors => _.merge({ authors: createdAuthors }, data || {}));
};

const createBooks = (data) => {  
  const newBooks = books.map((book, i) => {
    book.author = data.authors[i]._id;
    book.category = data.categories[i]._id;
    return createDoc(Book, book);
  });

  return Promise.all(newBooks)    
    .then(createdBooks => _.merge({ books: createdBooks }, data || {}));
};

cleanDB()
  .then(createUsers)
  .then(createAuthors)
  .then(createCategories)
  .then(createBooks)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
