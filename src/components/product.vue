<template>
  <ul>
    <li v-for="item in goodsList" :key="item.id" @click="goToDetail(item.id)">
      <img :src="item.list_pic_url" style="display: block" width="100%" alt=""/>
      <div class="van-ellipsis">{{ item.name }}</div>
      <div class="produce">{{ item.retail_price | filterMoney }}</div>

    </li>
  </ul>
</template>

<script>
export default {
  name: "product",
  props: ["goodsList"],
  methods: {
    goToDetail(id) {
      this.$router.push('/productdetail?id=' + id)
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  padding: .1rem 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  li {
    width: 49%;
    background: #fff;
    margin-bottom: .1rem;
    text-align: center;
    line-height: .3rem;

    .produce {
      color: darkred;
    }
  }
}
</style>
