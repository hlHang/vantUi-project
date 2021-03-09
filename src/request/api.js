import request from "@/request/request";

// 请求首页数据
export const  GetHomeData = () => request.get('/index/index')

// 获取HistoryHot数据
export const  GetSearchInterfaceData = () => request.get('/search/index')

// 搜索物品搜索
// get请求的params需要结构，而post不用
export const  GetSearchData = (params) => request.get('/goods/list',{params})

// export const  GetSearchData = (params) => request.post('/goods/list',params)


