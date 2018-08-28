const router = require('express').Router();
const controller = require('./authorController');
const auth = require('../../auth/auth');
const checkUser = [auth.decodeToken(), auth.getFreshUser()];

router.param('id', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post);

router.route('/:id')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete);

router.route('/:id/follow')
  .post(checkUser, controller.follow)
  .delete(checkUser, controller.unfollow);

router.route('/:id/isFollowing')
  .get(checkUser, controller.getAuthorFollowingInfo);

module.exports = router;
