<template>
  <van-list
      :finished="finished"
      finished-text="没有更多了"
  >
    <van-cell v-for="item in arr" :key="item" :title="item"/>
  </van-list>
</template>

<script>
export default {
  name: "List",
  props: ["arr"],
  data() {
    return {
      finished: true
    }
  }
}
</script>

<style scoped>

</style>
