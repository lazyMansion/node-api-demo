const ArticleModel = require("../modules/article");
const {SuccessModel,ErrorModel} = require("../modules/resModel");

class articleController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        if(req.title && req.author && req.content && req.category){
            try{
                //创建文章模型
                const ret = await ArticleModel.createArticle(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await ArticleModel.getArticleDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = new SuccessModel(data,'创建文章成功')
            }catch(err){
                ctx.response.status = 412;
                ctx.body = new ErrorModel(err,"创建文章失败")
            }
        }else {
            ctx.response.status = 416;
            ctx.body = new ErrorModel("参数不全")
        }
    }

    /**
     * 获取文章详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.params.id;
        if(id){
            try{
                // 查询文章详情模型
                let data = await ArticleModel.getArticleDetail(id);
                ctx.response.status = 200;
                ctx.body = new SuccessModel(data,'查询成功')
            }catch(err){
                ctx.response.status = 412;
                ctx.body = new ErrorModel(err,'查询失败')
            }
        }else {
            ctx.response.status = 416;
            ctx.body = new ErrorModel(err,'文章ID必须传')
        }
    }
}

module.exports = articleController;