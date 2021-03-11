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
    <van-cell class="showSku" title="展示弹出层" is-link/>
    <div class="attribute">
      <h4>商品参数</h4>
      <ul>
        <li v-for="(item,index) in attribute" :key="index">
          <span>{{ item.name }}</span>
          <section class="van-ellipsis">{{ item.value }}</section>
        </li>
      </ul>
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
      info: {},
      attribute: []
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
              let {gallery, info, attribute} = res.data
              this.gallery = gallery
              this.info = info
              this.attribute = attribute
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
  padding: .15rem 0;

  h3 {
    font-weight: normal;
    font-size: .2rem;
    line-height: .5rem;
    padding: .2rem 0;
  }

  p {
    color: #999;
    font-size: .12rem;
    line-height: .2rem;
  }

  div {
    color: darkred;
    line-height: .3rem;
  }
}

.showSku {
  margin-bottom: .2rem;
  border-top: 1px solid #ccc;
}

.attribute {
  background-color: #ffffff;
  padding: .2rem 4%;

  h4 {
    font-weight: normal;
    font-size: .16rem;
    margin-bottom: 0.2rem;
  }

  ul {
    li {
      background: #efefef;
      border-radius: .3rem;
      height: .4rem;
      margin-bottom: .1rem;
      line-height: .4rem;
      display: flex;
      justify-content: space-between;
      span {
        width: 22%;
        text-align: right;
      }

      section {
        flex: 1;
        padding-left: .2rem;
      }
    }
  }
}
</style>
