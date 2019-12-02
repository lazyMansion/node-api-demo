const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const {SuccessModel,ErrorModel} = require("../modules/resModel");
const secret = "ILOVEXIAOXIAO"
let util = {
    verifyToken(token){
        let cert = 'ILOVEXIAOXIAO',res = {};

        try{
            // jwt.verify(token,cert,(err,decoded) => {
            //     if(err){
            //         return new ErrorModel('token信息错误')
            //     }else{
            //         res = jwt.sign(decoded, cert, { expiresIn: 60 * 3 })
            //         return new SuccessModel(res,'token更新')
            //     }
            // })

            let result = jwt.verify(token, cert) || {};
            let {exp = 0} = result,current = Math.floor(Date.now()/1000);
            if(current <= exp){
                delete result.iat;
                delete result.exp;
                //自动更新token
                //res = jwt.sign(result, secret, { expiresIn: 60 * 3 })
                return new SuccessModel(result,'token更新')
            }else{
                return new ErrorModel('登录已过期')
            }
        }catch(err){
            return new ErrorModel(err)
        }
        
        
    }
}

module.exports = util;