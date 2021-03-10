<template>
  <van-tabbar v-model="active" active-color="pink" inactive-color="#000">
    <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/topic" icon="label-o">专题</van-tabbar-item>
    <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" icon="cart-o">购物车</van-tabbar-item>
    <van-tabbar-item to="/user" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "MyTabbar",
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
