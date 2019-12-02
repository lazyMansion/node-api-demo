const router = require('koa-router')()
const UserController = require('../controllers/user');

//创建用户
router.post('/user/create',UserController.create);
router.get('/user/detail',UserController.detail);
router.post('/user/login',UserController.login);

module.exports = router
