<template>
  <div class="home">
    <div v-if="$route.path==='/home'">
      <van-search
          v-model="SearchValue"
          shape="round"
          disabled
          background="#fffff"
          placeholder="请输入搜索关键词"
          @click="goToSearchInterface"
      />

      <van-swipe class="my-swipe" indicator-color="darkred">
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" width="100%" style="display: block;" alt="">
        </van-swipe-item>
      </van-swipe>

      <van-grid :column-num="5">
        <van-grid-item v-for="item in channel" :key="item.id" :icon="item.icon_url" :text="item.name"/>
      </van-grid>

      <my-title> 插槽 </my-title>

    </div>

    <transition name="van-slide-right">
      <router-view v-if="$route.path==='/home/search'"></router-view>
    </transition>
  </div>

</template>

<script>
import {GetHomeData} from "@/request/api";
import MyTitle from "@/components/MyTitle";

export default {
  name: 'Home',
  components: {MyTitle},
  data() {
    return {
      SearchValue: "",
      // 轮播图
      banner: [],
      // 宫格
      channel: [],
      components: {MyTitle}
    }
  },
  created() {
    this.getHomePageData()
  },
  methods: {
    // 获取主页数据
    getHomePageData() {
      GetHomeData()
          .then(response => {
            if (response.errno === 0) {
              console.log(response.data)
              // eslint-disable-next-line no-unused-vars
              let {banner, channel} = response.data;
              this.banner = banner
              this.channel = channel
            }
          })
    },
    // 前往搜索页
    goToSearchInterface() {
      this.$router.push('/home/search')
    }
  }
}
</script>

<style lang="less" scoped>
/*
.slide-enter, .slide-leave-to {
  right: -100%;
}

.slide-enter-active, .slide-leave-active {
  transition: right 1s linear;
}

.slide-enter-to, .slide-leave {
  right: 0;
}
*/

</style>
