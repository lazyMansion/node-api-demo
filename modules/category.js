// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;
const Op = Sequelize.Op;
// 引入数据表模型
const Category = Sequelize.import('../schema/category');
Category.sync({force: false}); //自动创建表

class CategoryModel {
    // 创建分类
    static async createCategory(data){
        return await Category.create({
            label: data.label, //分类名称
            parentId: data.parentId || 0,  //分类上级Id
            articleId: data.articleId || 0 //绑定文章ID
        })
    }
    //编辑分类
    static async editCategory(data){
        console.log('data',data)
        return await Category.update({
            label: data.label,
            articleId: data.articleId,
        }, {
            where: {id: data.id}
        })
    }

    // 查询分类 单个
    static async getCategory(id){
        return await Category.findOne({
            where:{id},
            attributes: ['id','label','parentId','articleId']
        })
    }

    //删除单个分类
    static async deleteCategory(id){
        // return await Category.destroy({
        //     where: {
        //         $or: [
        //             {id: id},
        //             {parentId: id}
        //         ]
        //     }
        // })

        let ret = await Category.destroy({
            where: {
                id
            }
        })
            await Category.destroy({
                where: {
                    parentId: id
                }
            })
        return ret
    }

    // 查询分类 所有分类
    static async getCategoryList(){
        return await Category.findAll({
            raw: true,
            attributes: ['id','label','parentId','articleId']
        })
    }
}

module.exports = CategoryModel;
