import request from "@/request/request";

// 请求首页数据
export const  GetHomeData = () => request.get('/index/index')

// 获取HistoryHot数据
export const  GetSearchInterfaceData = () => request.get('/search/index')


