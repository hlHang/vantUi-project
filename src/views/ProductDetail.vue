<template>
 <div>商品详情页</div>
</template>

<script>
import {GetProductDetailData} from "@/request/api";

export default {
name: "ProductDetail",
    data() {
    return {}
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
        id:this.$route.query.id
      })
      .then(res =>{
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
