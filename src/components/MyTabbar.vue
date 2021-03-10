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
    return {}
  },
  mounted() {
    console.log(this.$route.path)
  },
  computed: {
    active: {
      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        switch (this.$route.path) {
          case '/home':
            return 0
          case '/topic':
            return 1
          case '/category':
            return 2
          case '/cart':
            return 3
          case '/user':
            return 4
          default:
            break;
        }
      },
      set() {}
    }
  }
}
</script>

<style scoped>

</style>
