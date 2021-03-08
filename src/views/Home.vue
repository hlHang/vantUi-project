<template>
  <div class="home">
    <van-search
        v-model="SearchValue"
        shape="round"
        disabled
        background="#fffff"
        placeholder="请输入搜索关键词"
    />

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
      <van-swipe-item v-for="item in banner" :key="item.id">
         <img :src="item.image_url" width="100%" style="display: block;"  alt="">
      </van-swipe-item>
    </van-swipe>
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
    }
  }
}
</script>
