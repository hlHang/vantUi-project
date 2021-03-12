import request from "@/request/request";

// 请求首页数据
export const GetHomeData = () => request.get('/index/index')

// 获取HistoryHot数据
export const GetSearchInterfaceData = () => request.get('/search/index')

// 搜索物品搜索
// get请求的params需要结构，而post不用
export const GetSearchData = (params) => request.get('/goods/list', {params})

// 获取实时搜索数据
export const GetRealTimeSearchData = (params) => request.get('/search/helper', {params})

// 产品明细
export const GetProductDetailData = (params) => request.get('/goods/detail', {params})

// 清楚历史记录数据
export const CleanHistoryData = () => request.post('/search/clearhistory')

// 获取相关产品
export const GetRelatedGoodsData = (params) => request.get('/goods/related', {params})

// 获取相关产品
export const GetCartCountsData = () => request.get('/cart/goodscount')

// 登录
export const GoLogin = (params) => request.post('/auth/loginByWeb', params)

// 添加至购物车
export const AddToCart = (params) => request.post('/cart/add', params)

// 全选状态
export const GoodsChecked = (params) => request.post('/cart/checked', params)

// 获取购物车信息
export const GetCartInfoData = () => request.get('/cart/index')

// export const  GetSearchData = (params) => request.post('/goods/list',params)


