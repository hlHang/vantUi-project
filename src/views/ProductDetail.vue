<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" style="display: block" alt="">
      </van-swipe-item>
    </van-swipe>
    <tips/>
    <div class="info">
      <h3>{{ info.name }}</h3>
      <p>{{ info.goods_brief }}</p>
      <div>{{ info.retail_price | filterMoney }}</div>
    </div>
  </div>
</template>

<script>
import {GetProductDetailData} from "@/request/api";
import Tips from "@/components/Tips";

export default {
  name: "ProductDetail",
  components: {Tips},
  data() {
    return {
      gallery: [],
      info: []
    }
  },
  created() {
    this.GetOneProductDetailData()
  },
  mounted() {
    console.log(this.$route)
  },
  methods: {
    GetOneProductDetailData() {
      GetProductDetailData({
        id: this.$route.query.id
      })
          .then(res => {
            if (res.errno === 0) {
              console.log(res.data)
              let {gallery, info} = res.data
              this.gallery = gallery
              this.info = info
            }
          })
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  background: #fff;
  text-align: center;

  h3 {
    font-weight: normal;
    font-size: .2rem;
    line-height: .5rem;
  }

  p {
    color: #999;
    font-size: .12rem;
    line-height: .3rem;
  }

  div {
    color: darkred;
    line-height: .3rem;
  }
}
</style>
