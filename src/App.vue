<template>
  <div id="app">
    <router-view/>
    <MyTabbar/>
  </div>
</template>

<script>
import MyTabbar from "@/components/MyTabbar";

export default {
  components: {MyTabbar}
}

</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #efefef;
  min-height: 100%;
}

html, body {
  height: 100%;
}

html {
  font-size: 100px;
}

body {
  font-size: .14rem;
}
</style>
