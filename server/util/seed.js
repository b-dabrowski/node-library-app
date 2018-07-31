const _ = require('lodash');
const Category = require('../api/category/categoryModel');
const Author = require('../api/author/authorModel');
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

const createDoc = (model, doc) => new Promise((resolve, reject) => {
  new model(doc).save((err, saved) => (err ? reject(err) : resolve(saved)));
});

const cleanDB = () => {
  logger.log('... cleaning the DB');
  const cleanPromises = [Author, Category]
    .map(model => model.remove().exec());
  return Promise.all(cleanPromises);
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

cleanDB()
  .then(createAuthors)
  .then(createCategories)
  .then(logger.log.bind(logger))
  .catch(logger.log.bind(logger));
