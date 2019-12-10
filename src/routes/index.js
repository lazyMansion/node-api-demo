//引入路由文件
const user = require('./users')
const article = require('./article')
const public = require('./public')

module.exports = function (app) {
    app.use(user.routers()).use(user.allowedMethods());
    app.use(article.routers()).use(article.allowedMethods());
    app.use(public.routers()).use(public.allowedMethods());
}