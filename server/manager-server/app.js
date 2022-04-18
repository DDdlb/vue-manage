const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4js = require('log4js')
const router = require('koa-router')()
// const index = require('./routes/index')
const users = require('./routes/users')
const jwt = require('jsonwebtoken')
const koajwt = require('koa-jwt')
const util = require('./utils/util')
const SECRET = "vue-manager"
// const user = require('./model/user')
// user.select({
//   // userId: 5
//   "userName" : "admin",//用户名称
//   "userPwd" : "e10adc3949ba59abbe56e057f20f883e",//用户密码，md5加密
//   "userEmail" : "admin@imooc.com",//用户邮箱
//   "mobile":"13788888888",//手机号
//   "sex":0,//性别 0:男  1：女 
//   "deptId":1,//部门
//   "job":"前端架构师",//岗位
//   "state" : 1,// 1: 在职 2: 离职 3: 试用期
//   "role": 0, // 用户角色 0：系统管理员  1： 普通用户
//   "roleList" : 1, //系统角色
//   "createTime" : "2021-01-17T13:32:06",//创建时间
//   "lastLoginTime" : "2021-01-17T13:32:06"
// });
// error handler
onerror(app)

require('./config/db')

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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(async (ctx, next)=>{
  await next().catch((err)=>{
    if(err.status == '401'){
      ctx.status = 200
      ctx.body = {
        code: util.CODE.AUTHOR_ERROR,
        msg: 'token认证失败'
      }
    }else{

    }
  })
})

app.use(koajwt({secret:SECRET}).unless({
  path: [/^\/api\/users\/login/]
}))

router.get('/api/leave/count', (ctx)=>{
  const token = ctx.request.headers.authorization.split(' ')[1]
  const payload = jwt.verify(token, SECRET)
  ctx.body = payload
})

// routes 
// app.use(index.routes(), index.allowedMethods())
router.use(users.routes(), users.allowedMethods())
app.use(router.routes(), router.allowedMethods())
// app.use(router.routes(), router.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
 