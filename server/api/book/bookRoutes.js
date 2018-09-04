const router = require('express').Router();
const controller = require('./bookController');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(checkUser, controller.post);

router.route('/borrowed')
  .get(checkUser, controller.getBorrowed);

router.route('/created')
  .get(checkUser, controller.getCreated);

router.route('/author')
  .get(controller.getByAuthor);

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

module.exports = router;