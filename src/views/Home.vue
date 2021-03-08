<template>
  <div class="home">
    <van-search
        v-model="SearchValue"
        shape="round"
        disabled
        background="#fffff"
        placeholder="请输入搜索关键词"
    />
  </div>
</template>

<script>
import {GetHomeData} from "@/request/api";

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      SearchValue: ""
    }
  },
  created() {
    this.getHomePageData()
  },
  methods: {
    getHomePageData() {
      GetHomeData()
          .then(response => {
            console.log(response)
          })
    }
  }
}
</script>
