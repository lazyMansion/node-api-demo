// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
// 引入数据表模型
const Category = Sequelize.import('../schema/category');
Category.sync({force: false}); //自动创建表

class CategoryModel {
    // 创建分类
    static async createCategory(data){
        return await Category.create({
            name: data.name, //分类名称
            parentId: data.parentId || 0  //分类上级Id
        })
    }

    // 查询分类 单个
    static async getCategory(id){
        return await Category.findOne({
            where:{
                id
            }
        })
    }

    // 查询分类 所有分类
    static async getCategoryList(){
        return await Category.findAll({row:true})
    }
}

module.exports = CategoryModel;
