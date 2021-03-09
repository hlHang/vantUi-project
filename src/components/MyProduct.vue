<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled/>
      <van-dropdown-item title="价格" v-model="priceVal" :options="priceArr" @change="priceChange"/>
      <van-dropdown-item title="分类" v-model="categoryVal" :options="filterCategory" @change="categoryChange"/>
    </van-dropdown-menu>
    <van-empty v-if="ifEmpty" image="search" description="你搜索的产品不存在"/>
    <product v-else
             :goodsList="goodsList"
    />
  </div>
</template>

<script>
import product from "@/components/product";

export default {
  name: "MyProduct",
  props: ["filterCategory", "goodsList"],
  data() {
    return {
      priceVal: 0,
      // 分离下拉菜单的当前项
      categoryVal: 1005000,
      // 价格下拉菜单的当前页
      priceArr: [
        {text: '价格由高到低', value: "desc"},
        {text: '价格由低到高', value: 'asc'}
      ],
      // 判断是否有产品列表
      ifEmpty: false
    }
  },
  components: {product},
  mounted() {
    this.filterCategory.map(val => {
      if (val.checked) {
        this.categoryVal = val.value
      }
    })
  },
  methods: {
    // 分类下拉菜单的点击事件
    categoryChange(value) {
      this.$emit('categoryChange', value)
    },
    // 价格下拉菜单点击事件
    priceChange(value) {
      this.$emit('priceChange', value)
    }
  }
}
</script>

<style scoped>

</style>
