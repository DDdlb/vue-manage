/**
 * axios 封装
 */
import axios from 'axios'
import config from '../config/index'
import {
    ElMessage
} from 'element-plus'
import router from '../router/index'
import { def } from '@vue/shared'
import storage from './storage'

const TOKEN_INVALID = ' token认证失败，请重新登录'
const NETWORK_ERROR = '网络异常，请稍后再试'
// 创建axios实例，添加全局配置
// console.log(config);
const service = axios.create({
    baseURL: config.baseApi,
    timeout: 16000
})

// 请求拦截
service.interceptors.request.use((req) => {
    // TO-DO
    const headers = req.headers
    const userInfo = storage.getItem('userInfo');
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
        msg
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

    if(config.env === 'prod'){
        service.defaults.baseURL = config.baseApi;
    }else{
        if('mock' in options) service.defaults.baseURL = options.mock? config.mockApi: config.baseApi
        else service.defaults.baseURL = config.mock? config.mockApi: config.baseApi
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