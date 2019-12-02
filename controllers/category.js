const CategoryModel = require("../modules/category");
const {SuccessModel,ErrorModel} = require("../modules/resModel");
class categoryController {
    //创建分类
    static async create(ctx){
        //接受客户端
        let req = ctx.request.body;
        if(req.label){
            try{
                const ret = await CategoryModel.createCategory(req);
                let data = await CategoryModel.getCategory(ret.id);
                //数据处理
                data.children = [];

                ctx.response.status = 200;
                ctx.body = new SuccessModel(data,'创建成功')
            }catch(err){
                ctx.response.status = 300;
                ctx.body = new ErrorModel(err,"创建失败")
            }
        }else {
            ctx.response.status = 200;
            ctx.body = new ErrorModel("参数不齐全")
        }
    }
    //编辑分类
    static async edit(ctx){
        let req = ctx.request.body;
        if(req.id){
            try{
                const ret = await CategoryModel.editCategory(req);
                if(!!ret){
                    let data = await CategoryModel.getCategory(req.id);
                    //数据处理
                    data.children = [];

                    ctx.response.status = 200;
                    ctx.body = new SuccessModel(data,'编辑成功')
                }else{
                    ctx.body = new ErrorModel(ret,"编辑返回值")
                }
            }catch(err){
                console.log('errControllers',err)
                ctx.response.status = 300;
                ctx.body = new ErrorModel(err,"编辑失败")
            }
        }else{
            ctx.response.status = 200;
            ctx.body = new ErrorModel("参数不齐全")
        }
    }
    //获取分类列表
    static async list(ctx){
        try{
            let data = await CategoryModel.getCategoryList();
            //处理数据
            for(let i = 0; i < data.length; i++){
                if(data[i].parentId == 0){
                    data[i].children = []
                }else{
                    for(let j = 0; j < data.length; j ++){
                        if(data[i].parentId == data[j].id){
                            if(!!data[j].children){
                                data[j].children.push(data[i])
                            }else{
                                data[j].children = []
                                data[j].children.push(data[i])
                            }
                            
                        }
                    }
                }
            }
            for(let n = 0; n < data.length; n++){
                if(data[n].parentId != 0){
                    data.splice(n,1);
                    n = n - 1
                }
            }
            ctx.response.status = 200;
            ctx.body = new SuccessModel(data,'查询成功')
        }catch(err){
            console.log('err',err)
            ctx.response.status = 300;
            ctx.body = new ErrorModel(err,"查询失败")
        }
    }
}

module.exports = categoryController