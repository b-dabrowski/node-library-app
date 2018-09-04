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

router.route('/category')
  .get(controller.getByCategory);

router.route('/:id')
  .get(checkUser, controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

router.route('/:id/notLogged')
  .get(controller.getOneNotLogged);

router.route('/:id/borrow')
  .post(checkUser, controller.borrowBook)
  .delete(checkUser, controller.returnBook);

module.exports = router;
