<template>
  <div>
    <div class="history">
      <div class="top">
        <h4>历史记录</h4>
        <van-icon name="delete"/>
      </div>
      <div class="down">
        <van-tag   round type="primary" >标签</van-tag>
        <van-tag   round type="primary" >标签</van-tag>
        <van-tag   round type="primary" >标签</van-tag>
        <van-tag   round type="primary">标签</van-tag>
        <van-tag   round type="primary">标签</van-tag>
        <van-tag   round type="primary">标签</van-tag>
        <van-tag   round type="primary">标签</van-tag>
        <van-tag   round type="primary">标签</van-tag>
      </div>
    </div>

    <div class="history">
      <div class="top">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
        <van-tag round type="primary">标签</van-tag>
      </div>
    </div>
  </div>
</template>

<script>
import {GetSearchInterfaceData} from "@/request/api";

export default {
  name: "HistoryHot",
  data() {
    return {

    }
  },
  created() {
    this.GetAllSearchInterfaceData()
  },
  methods: {
  GetAllSearchInterfaceData() {
    GetSearchInterfaceData()
    .then(result => {
      console.log(result)
    })
  }
  }
}
</script>

<style lang="less" scoped>
.history {
  padding: 0 2%;
  background: #fff;
  margin-bottom: .2rem;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .5rem;
    font-size: .2rem;

    h4 {
      font-weight: normal;
    }
  }

  .down {
    .van-tag {
      font-size: .14rem;
      margin-right: .1rem;
      margin-bottom: .1rem;
      padding: 0.03rem;

    }
  }
}
</style>
