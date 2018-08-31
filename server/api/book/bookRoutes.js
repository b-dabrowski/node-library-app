const router = require('express').Router();
const controller = require('./bookController');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(checkUser, controller.get)
  .post(checkUser, controller.post);

router.route('/:id')
  .get(checkUser, controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;
