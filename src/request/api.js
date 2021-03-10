import request from "@/request/request";

// 请求首页数据
export const  GetHomeData = () => request.get('/index/index')

// 获取HistoryHot数据
export const  GetSearchInterfaceData = () => request.get('/search/index')

// 搜索物品搜索
// get请求的params需要结构，而post不用
export const  GetSearchData = (params) => request.get('/goods/list',{params})

// 获取实时搜索数据
export const  GetRealTimeSearchData = (params) => request.get('/search/helper',{params})

// 清楚历史记录数据
export const  CleanHistoryData = () => request.post('/search/clearhistory')

// export const  GetSearchData = (params) => request.post('/goods/list',params)


