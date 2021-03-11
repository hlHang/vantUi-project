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

      <div class="title">制造商直供</div>
      <ul class="brand">
        <li v-for="item in brandList" :key="item.id">
          <img :src="item.pic_url" alt="">
          <h4>{{ item.name }}</h4>
          <div>{{ item.floor_price | filterMoney }}</div>
        </li>
      </ul>
    </div>

    <transition name="van-slide-right">
      <router-view v-if="$route.path==='/home/search'"></router-view>
    </transition>
  </div>

</template>

<script>
import {GetHomeData} from "@/request/api";

export default {
  name: 'Home',
  data() {
    return {
      SearchValue: "",
      // 轮播图
      banner: [],
      // 宫格
      channel: [],
      // 品牌
      brandList: []
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
              // eslint-disable-next-line no-unused-vars
              let {banner, channel, brandList} = response.data;
              this.banner = banner
              this.channel = channel
              this.brandList = brandList
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

.title {
  background: #ffffff;
  height: .5rem;
  line-height: .5rem;
  text-align: center;
  margin-top: .2rem;
}

.brand {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;


  li {
    width: 49%;
    position: relative;
    margin-bottom: .1rem;

    img {
      width: 100%;
      display: block;
      filter: brightness(0.9);
    }

    h4 {
      position: absolute;
      left: 10px;
      top: 0;
      line-height: .4rem;
    }

    div {
      position: absolute;
      left: 10px;
      top: 0.4rem;
      line-height: .4rem;
      color: darkred;
    }
  }
}

</style>
