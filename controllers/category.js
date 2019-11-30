const CategoryModel = require("../modules/category");
const {SuccessModel,ErrorModel} = require("../modules/resModel");
class categoryController {
    //创建分类
    static async create(ctx){
        //接受客户端
        let req = ctx.request.body;
        if(req.name){
            try{
                const ret = await CategoryModel.createCategory(req);
                const data = await CategoryModel.getCategory(ret.id);

                ctx.response.status = 200;
                ctx.body = new SuccessModel(data,'创建成功')
            }catch(err){
                ctx.response.status = 300;
                ctx.body = new ErrorModel(err,"创建失败")
            }
        }else {
            ctx.response.status = 300;
            ctx.body = new ErrorModel("参数不齐全")
        }
    }

    //获取分类列表
    static async list(ctx){
        try{
            let data = CategoryModel.getCategoryList();
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询成功',
                data
            }
        }catch(err){
            ctx.response.status = 300;
            ctx.body = {
                code: 300,
                msg: '查询失败',
                data: err
            }
        }
    }
}

module.exports = categoryController