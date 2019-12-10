const router = require('koa-router')()
//分类控制器
const CategoryController = require('../controllers/category');

//创建分类
router.post('/public/category/create',CategoryController.create);
//编辑分类
router.post('/public/category/delete',CategoryController.delete);
//删除分类
router.post('/public/category/edit',CategoryController.edit);
//获取分类
router.get('/public/category/list',CategoryController.list)
module.exports = router