/**
 * axios 封装
 */
import axios from 'axios'
import {showFullScreenLoading, tryHideFullScreenLoading} from './serviceLoading'
import { checkStatus } from './checkStatus'

const baseURL = "https://55e88de2-49c8-4feb-a29a-8ff8ee713422.mock.pstmn.io"

const ResultEnum = {
	SUCCESS:  200,
	ERROR: 500,
	OVERDUE: 599,
	TIMEOUT: 10000,
	TYPE: "success"
}

const config = {
    // 默认地址
    baseURL: baseURL,
    // 请求超时
    timeout: ResultEnum.TIMEOUT,
    // 跨域时候允许携带凭证
	// withCredentials: true
}

console.log('config',config);

const token = 'test token'

class RequestHttp{
    constructor(config){
        // 初始化实例
        this.service = axios.create(config)
        /**
         * @description 请求拦截器
         * 展示加载组件，添加token认证
         */
        this.service.interceptors.request.use((config)=>{
            showFullScreenLoading();
            return {...config, headers: {Authorization: 'Bearer ' + token}}
        },
        (error)=>{
            return Promise.reject(error)
        })

        /**
         * @description 响应拦截
         */
        this.service.interceptors.response.use((res)=>{
            const { data } = res
            // 关闭加载窗
            tryHideFullScreenLoading()
            // * 登陆失效（code == 599）
			if (data.code == ResultEnum.OVERDUE) {
				ElMessage.error(data.msg);
				globalStore.setToken("");
				router.replace({
					path: "/login"
				});
				return Promise.reject(data);
			}

            // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
			if (data.code && data.code !== ResultEnum.SUCCESS) {
				ElMessage.error(data.msg);
				return Promise.reject(data);
			}
            let rx = data
            if(typeof(data) == 'string'){
                rx = JSON.parse(data)
            }
            // * 成功请求
			return rx;
        },
        async (error)=>{
            const { response } = error;
            // 关闭加载窗
            tryHideFullScreenLoading();
            // 根据响应的错误状态码，做不同的处理
			if (response) return checkStatus(response.status);
            // 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
			if (!window.navigator.onLine) return router.replace({ path: "/500" });
			return Promise.reject(error);
        })
        
    }

    get(url, params={}, _object={}){
        return this.service.get(url, {...params, ..._object})
    }
    post(url, params={}, _object={}){
        return this.service.post(url, params, _object)
    }
    put(url, params={}, _object={}){
        return this.service.put(url, params, _object)
    }
    delete(url, params={}, _object={}){
        return this.service.delete(url, {...params, ..._object})
    }
}

// const http = new RequestHttp(config)
// http.get

export default new RequestHttp(config)