const router = require('express').Router();
const logger = require('../../util/logger');
const controller = require('./userController');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);
router.get('/me', checkUser, controller.me);

router.route('/')
  .get(controller.get)
  .put(checkUser, controller.validate, controller.put)
  .post(controller.validate, controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(checkUser, controller.put)
  .delete(checkUser, controller.delete);

  router.route('/profiles/:username')
  .get(controller.getProfile);

module.exports = router;
