import request from "@/request/request";

// 请求首页数据
export const  GetHomeData = () => request.get('/index/index')
