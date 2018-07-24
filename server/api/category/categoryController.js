const _ = require('lodash');
const Category = require('./categoryModel');

exports.params = function addCategoryToRequest(req, res, next, id) {
  Category.findById(id)
    .then((category) => {
      if (!category) {
        next(new Error('No category with that id'));
      } else {
        req.category = category;
        next();
      }
    }, (err) => {
      next(err);
    });
};

exports.get = function get(req, res, next) {
  Category.find({})
    .then((category) => {
      res.json(category);
    }, (err) => {
      next(err);
    });
};

exports.getOne = function getOne(req, res, next) {
  const category = req.category;
  res.json(category);
};

exports.put = function put(req, res, next) {
  const category = req.category;
  const update = req.body;

  _.merge(category, update);

  category.save((err, saved) => {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  });
};

exports.post = function post(req, res, next) {
  const newCategory = req.body;

  Category.create(newCategory)
    .then((category) => {
      res.json(category);
    }, (err) => {
      next(err);
    });
};

exports.delete = function remove(req, res, next) {
  const categoryToRemove = req.category;
  categoryToRemove.remove((err, removed) => {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
