const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//解决跨域
const cors = require('koa-cors')
const users = require('./routes/users')
const article = require('./routes/article')
const public = require('./routes/public')
const Utils = require('./utils/index')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors()) //使用cors

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    
    let {url = ''} = ctx;
    console.log("ctx.url",url)
    console.log("ctx.token",ctx.request.headers.token)
    if(url != '/users/login' && url != '/users/create'){//需要校验登录态
        console.log("1111")
        // 验证 Token
        let check = Utils.verifyToken(ctx.request.headers.token);
        console.log("check",check)
        if(check.code == 200) {
            console.log("验证通过",check);
            ctx.cookies.set('user', check, {
                maxAge:86400000,
                httpOnly: true
            });
            await next();
        }else{
            console.log("验证失败",check)
            return ctx.body = check;
        }
    }else{
        console.log("2222")
        await next();
    }
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(article.routes(), article.allowedMethods())
app.use(public.routes(), public.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
