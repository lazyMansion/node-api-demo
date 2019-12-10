const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
//解决跨域
const cors = require('koa-cors')
const Utils = require('./src/utils/index')
const router = require('./src/routes');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/src/views', {
  extension: 'pug'
}))
app.use(cors()) //使用cors

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    let {url = ''} = ctx;
    //校验登录
    if(url != '/user/login' && url != '/user/create'){
        // 验证 Token
        let check = Utils.verifyToken(ctx.request.headers.token);
        if(check.code == 200) {
            ctx.cookies.set('user', check, {
                maxAge:86400000,
                httpOnly: true
            });
            Object.defineProperty(ctx.request.headers, 'userId', {value: check.data.userId});// 只读属性
            await next();
        }else{
            return ctx.body = check;
        }
    }else{
        await next();
    }
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
router(app);

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
