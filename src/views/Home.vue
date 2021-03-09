<template>
  <div class="home">
    <van-search
        v-model="SearchValue"
        shape="round"
        disabled
        background="#fffff"
        placeholder="请输入搜索关键词"
        @click="goToSearchInterface"
    />

    <van-swipe class="my-swipe"  indicator-color="darkred">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img :src="item.image_url" width="100%" style="display: block;" alt="">
      </van-swipe-item>
    </van-swipe>

    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>
import {GetHomeData} from "@/request/api";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      SearchValue: "",
      banner: []
    }
  },
  created() {
    this.getHomePageData()
  },
  methods: {
    getHomePageData() {
      GetHomeData()
          .then(response => {
            if (response.errno === 0) {
              console.log(response.data)
              // eslint-disable-next-line no-unused-vars
              let {banner} = response.data;
              this.banner = banner
              console.log(this.banner)
            }

          })
          .catch(err => {
            console.log(err)
          })
    },
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
