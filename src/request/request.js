// 拦截器
import axios from "axios";

// 创建一个单例
const instance = axios.create({
    baseURL: 'http://kumanxuan1.f3322.net:8001',
    timeout: 5000
})

// 请求拦截
instance.interceptors.request.use(config => {
    return config;
}, error => {
    return Promise.reject(error);
});

// 响应拦截
instance.interceptors.response.use(res => {
    return res.data;
}, error => {
    return Promise.reject(error);
})

export default instance;
