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
    <van-cell @click="show=true" class="showSku" title="展示弹出层" is-link/>
    <div class="attribute">
      <h4>商品参数</h4>
      <ul>
        <li v-for="(item,index) in attribute" :key="index">
          <span>{{ item.name }}</span>
          <section class="van-ellipsis">{{ item.value }}</section>
        </li>
      </ul>
    </div>
    <!--  把html标签渲染到标签中
          1. 使用v-html
          2. ref - 操作dom
          -->
    <div class="box" ref="box"></div>
    <div class="title">
      <span>常见问题</span>
    </div>
    <ul class="issue">
      <li v-for="item in issue" :key="item.id">
        <h3>{{ item.question }}</h3>
        <p>{{ item.answer }}</p>
      </li>
    </ul>
    <div class="title">
      <span>大家都在看</span>
    </div>
    <product :goods-list="goodsList"/>
    <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :hide-stock="sku.hide_stock"
        ref="sku"
    />
    <MyGoodsAction @addToCart="addToCart" :badge="badge"/>
  </div>
</template>

<script>

import {GetProductDetailData, GetRelatedGoodsData, AddToCart, GetCartCountsData} from "@/request/api";
import Tips from "@/components/Tips";
import product from "@/components/product";
import MyGoodsAction from "@/components/MyGoodsAction";

export default {
  name: "ProductDetail",
  components: {Tips, product, MyGoodsAction},
  data() {
    return {
      // 轮播图
      gallery: [],
      // 产品信息
      info: {},
      // 商品参数
      attribute: [],
      // 常见问题
      issue: [],
      // 相关产品
      goodsList: [],

      // Sku中产品信息
      goods: {
        picture: "",
      },
      sku: {
        hide_stock: false,
        tree: [],
        stock_num: "",
        price: ""
      },
      //Sku显示
      show: false,
      productList: [],
      // 购物车数量
      badge: 0
    }
  },
  created() {
    this.GetOneProductDetailData()
    this.GetAllRelatedGoodsData()
    this.GetAllCartCountsData()
  },
  methods: {
    // 获取产品详细信息
    GetOneProductDetailData() {
      GetProductDetailData({
        id: this.$route.query.id
      })
          .then(res => {
            if (res.errno === 0) {
              let {gallery, info, attribute, issue, productList} = res.data
              this.gallery = gallery
              this.info = info
              this.issue = issue
              this.attribute = attribute
              this.goods.picture = info.list_pic_url
              this.sku.stock_num = info.goods_number
              this.productList = productList
              this.sku.price = info.retail_price.toFixed(2)
              this.$refs.box.innerHTML = info.goods_desc
            }
          })
    },
    // 获取相关产品
    GetAllRelatedGoodsData() {
      GetRelatedGoodsData({
        id: this.$route.query.id
      })
          .then(res => {
            this.goodsList = res.data.goodsList
          })
    },
    // 添加购物车
    addToCart() {
      if (this.show) {
        // 正处于选择状态
        // this.$toast.success('可以加入购物车了')
        let num = this.$refs.sku.getSkuData().selectedNum
        AddToCart({
          goodsId: this.$route.query.id,
          productId: this.productList[0].id,
          number: num
        }).then(response => {
          if (response.errno === 0) {
            this.badge = response.data.cartTotal.goodsCount
            this.show = false
          }
        })
      } else {
        this.show = true
      }
    },
    // 获取购物车数量
    GetAllCartCountsData() {
      GetCartCountsData()
          .then(response => {
            if (response.errno === 0) {
              this.badge = response.data.cartTotal.goodsCount
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

/deep/ .box {
  img {
    width: 100%;
    display: block;
  }
}

.title {
  width: 100%;
  background-color: #ffffff;
  height: .5rem;
  position: relative;

  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background: #cccccc;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -25%;
  }

  span {
    width: 30%;
    position: relative;
    background: #fff;
    display: block;
    text-align: center;
    margin: 0 auto;
    height: .5rem;
    line-height: .5rem;
  }
}

.issue {
  padding: 0 4%;
  background: #fff;

  li {
    h3 {
      height: .3rem;
      line-height: .3rem;
      padding-left: .2rem;
      position: relative;
      font-weight: normal;

      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }

    p {
      font-size: .12rem;
      line-height: .2rem;
      padding-left: .2rem;
    }
  }
}

.van-goods-action {
  z-index: 4999;
}

.van-sku-container {
  min-height: auto;
}
</style>
