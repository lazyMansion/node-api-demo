const UserModel = require("../modules/user");
const {SuccessModel,ErrorModel} = require("../modules/resModel");
const md5 = require('md5');
const jwt = require('jsonwebtoken')

// 密钥
//const secret = fs.readFileSync(path.join(__dirname, '../configs/pub.pem'))
const secret = "ILOVEXIAOXIAO"

class userController {
    /**
     * 创建账户
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客服端
        let req = ctx.request.body;
        if(req.username && req.password){
            try{
                req.password = md5(req.password);
                //创建用户模型
                const ret = await UserModel.createUser(req);
                //使用刚刚创建用户  查询用户详情信息
                const user_data = await UserModel.getUserDetail(ret.id);
                let userInfo = {
                    username: user_data.username,
                    createdAt: user_data.createdAt
                }
                let token = jwt.sign(userInfo, secret, { expiresIn: 60 * 3000 })
                userInfo.token = token

                ctx.response.status = 200;
                ctx.body = new SuccessModel(userInfo,'创建成功')
            }catch(err){
                ctx.response.status = 300;
                ctx.body = new ErrorModel(err, '创建失败')
            }
        }else {
            ctx.response.status = 300;
            ctx.body = new ErrorModel("参数不符合")
        }
    }

    /**
     * 获取用户详情
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async detail(ctx){
        let id = ctx.request.header.userId;
        if(id){
            try{
                // 查询用户详情模型
                let data = await UserModel.getUserDetail(id);
                ctx.response.status = 200;
                ctx.body = new SuccessModel(data,'查询成功')
            }catch(err){
                ctx.response.status = 200;
                ctx.body = new ErrorModel(err, '查询失败')
            }
        }else {
            ctx.response.status = 416;
            ctx.body = new ErrorModel('ID必须传')
        }
    }

    // 用户登录
    static async login(ctx){
        let req = ctx.request.body;
        if(req.username && req.password){
            try{
                req.password = md5(req.password);
                const ret = await UserModel.login(req);
                if(!!ret){
                    const user_data = await UserModel.getUserDetail(ret.id);
                    let userInfo = {
                        username: user_data.username,
                        userId: user_data.id,
                        createdAt: user_data.createdAt
                    }
                    let token = jwt.sign(userInfo, secret, { expiresIn: 60 * 3000 })
                    userInfo.token = token

                    ctx.body = new SuccessModel(userInfo,'登录成功')
                }else{
                    ctx.body = new ErrorModel('账号或密码错误')
                }                
            }catch(err){
                ctx.body = new ErrorModel('登录失败')
            }
        }else {
            ctx.response.status = 200;
            ctx.body = new ErrorModel("账号或者密码不能为空")
        }
    }
}

module.exports = userController;