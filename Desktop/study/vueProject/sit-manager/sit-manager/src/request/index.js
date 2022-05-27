import axios from 'axios'
import storage from '../utils/storage'
import {
    ElMessage
} from 'element-plus'
import router from '../router/index'

const BASE_URL = 'https://www.fastmock.site/mock/ed0ec027602f0c7ceea9b911b55369a5/api'

const TOKEN_INVALID = ' token认证失败，请重新登录'
const NETWORK_ERROR = '网络异常，请稍后再试'

const service = axios.create({
    baseURL: BASE_URL,
    timeout: 16000
})

// 请求拦截
service.interceptors.request.use((req) => {

    const headers = req.headers
    const userInfo = storage.getItem('userInfo');
    // Token认证
    if(userInfo){
        if(!headers.Authorization) headers.Authorization = 'Bearer ' + userInfo.token
    }
    
    return req
})
// 响应拦截
service.interceptors.response.use((res) => {
    // console.log(res);
    const {
        code,
        data,
    } = res.data;
    // 200 表示成功，自己设置的状态码，不是http状态码
    if (code == 200) {
        return data;
    } else if (code == 401) {
        ElMessage.error(TOKEN_INVALID);
        setTimeout(() => {
            router.push('/login');
        }, 1500);
        return Promise.reject(TOKEN_INVALID);
    } else {
        ElMessage.error(NETWORK_ERROR);
        return Promise.reject(NETWORK_ERROR);
    }
})

/**
 * 请求函数
 * @param {*} options 请求配置
 */
 function request(options){
    options.method = options.method || 'get'
    if(options.method.toLowerCase() === 'get'){
        options.params = options.data;
    }

    return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item)=>{
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request;