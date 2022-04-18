/**
 * 用户管理模块
 */
const router = require('koa-router')()
const json = require('koa-json')
// const user = require('../model/user')
const util = require('../utils/util')
// const db = require('../config/db')
const User = require('../model/userSchema')
const jwt = require('jsonwebtoken')
// 二级路由
router.prefix('/api')

const SECRET = "vue-manager"

router.post('/users/login',  async (ctx) => {
    // const { userName, userPwd } = ctx.request.body
    // console.log(ctx)
    try{
        
        const { userName, userPwd } = ctx.request.body
        console.log(userName, userPwd);
        const res = await User.findOne({
            userName,
            userPwd
        })
        // console.log("res=>", res);
        console.log("234234");
        
        // const token = jwt.sign({
        //     data,
        // }, SECRET, {expiresIn: 30})
        console.log("res=>",res);
        if(res){
            console.log("token=>", token);
            // res.token = token
            ctx.body = {
                msg: "登录成功",
                data: {
                    token,
                    ...res
                },
                code: 200
            }
        }else{
            console.log("res  NULL");
            ctx.body = {
                msg: "账号密码不正确"
            }
        }
    }catch(error){
        console.log("error");
        // const param = ctx.request.query
        // const sql = "SELECT * FROM `users` WHERE `userName`='"+param.userName+"' and `psd`='"+param.psd+"'"
        ctx.body = {
            msg: error.msg
        }
        // console.log("res=>",res)
        console.log(error);
        // return error;
    }
    
})

router.get('/users/list', async (ctx) =>{
    try{
        const { userId, userName, state } = ctx.request.query;
        const { page, skipIndex } = util.paper(ctx.request.query);
        // 查找条件
        let param = {}
        if(userId) param.userId = userId;
        if(userName) param.userName = userName;
        if(state && state != 0) param.state = state;
        // 根据条件查找
        const query = User.find(param, {_id:0, userPwd:0})
        const list = await query.skip(skipIndex).limit(page.pageSize)
        //统计总条数
        const total = await User.countDocuments(param)
        // 返回
        ctx.body = {
            code: 200,
            data: {
                page: {
                    ...page,
                    total
                },
                list
            },
            msg: '成功'
        }
    }catch(error){
        ctx.body = {
            msg: error.msg
        }
        console.log(error);
    }
    
})

module.exports = router