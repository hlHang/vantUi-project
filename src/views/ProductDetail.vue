<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="darkred">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" style="display: block" alt="">
      </van-swipe-item>
    </van-swipe>
    <tips/>
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
      gallery: []
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
              let {gallery} = res.data
              this.gallery = gallery
            }
          })
    }
  }
}
</script>

<style scoped>

</style>
