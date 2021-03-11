<template>
  <van-goods-action>
    <van-goods-action-icon @click="ifSave=!ifSave"
                           :icon="ifSave ? 'star' : 'star-o'"
                           :text="ifSave ? '已收藏' : '未收藏'"
                           :color="ifSave? 'darkred' : '#666'"/>
    <van-goods-action-icon icon="cart-o" :badge="badge" @click="moveToCartInterface" text="购物车"/>
    <van-goods-action-button type="danger" @click="buyNow" text="立即购买"/>
    <van-goods-action-button type="warning" @click="addToCart" text="加入购物车"/>
  </van-goods-action>
</template>

<script>

export default {
  name: "MyGoodsAction",
  props: ['badge'],
  data() {
    return {
      ifSave: false,
    }
  },

  methods: {
    buyNow() {
      this.$toast.fail('该功能暂未开放')
    },
    addToCart() {
      this.$emit('addToCart')
    },
    moveToCartInterface() {
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>

</style>
