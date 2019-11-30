const router = require('koa-router')()
const UserController = require('../controllers/user');

//创建用户
router.post('/users/create',UserController.create);
router.get('/users/detail',UserController.detail);
router.get('/users/login',UserController.login);

module.exports = router
