/**
 *  功能函数封装
 */

const CODE = {
    SUCCESS: 200, // 成功
    PARAM_ERROR: 101, // 参数错误
    USER_ACCOUNT_ERROR: 201,  //账号或密码错误
    BUSINESS_ERROR: 301,  //业务请求失败
    USER_LOGIN_ERROR: 401,  //用户未登录
    AUTHOR_ERROR: 501,  // 认证失败或token过期
}

module.exports = {
    /**
     * 分页功能封装
     * @param {number} pageNum 
     * @param {number} pageSize 
     */
    paper({pageNum = 1, pageSize = 10}){
        // 转换为number型
        pageNum *= 1;
        pageSize *= 1;
        const skipIndex = (pageNum - 1) * pageSize;
        return {
            page: {
                pageNum,
                pageSize
            },
            skipIndex
        }
    },
    success(data='', msg='', code=CODE.SUCCESS){
        return {
            code, data, msg
        }
    },
    fail(msg='', data='', code=CODE.USER_ACCOUNT_ERROR){
        return {
            code, data, msg
        }
    },
    CODE
}