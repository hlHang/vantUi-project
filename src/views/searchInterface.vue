<template>
  <div class="popup">
    弹出层prop
    <button @click="liveFGn">离场</button>
  </div>

</template>

<script>
export default {
  name: "searchInterface",

  methods: {
    liveFGn() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.popup {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>
