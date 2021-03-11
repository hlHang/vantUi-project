<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
name: "MyTitle",
    data() {
    return {}
  }
}
</script>

<style scoped>
.title{
  background: pink;
  height: .5rem;
  line-height: .5rem;
  text-align: center;
}
</style>
