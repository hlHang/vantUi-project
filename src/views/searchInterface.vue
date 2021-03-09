<template>
  <div class="popup">
    <van-search
        v-model="iptVal"
        show-action
        :placeholder="iptPlaceholder"
        @search="onSearch"
        @input="onInput"
        @cancel="onCancel"
    />
    <HistoryHot
        v-if="blockShow===1"
        :history-keyword-list="historyKeywordList"
        :hotKeywordList="hotKeywordList"
    />
    <PromptList v-else-if="blockShow === 2" :arr="listArr"/>
    <MyProduct v-else
               :filterCategory="filterCategory"
               :goodsList="goodsList"
               @categoryChange="categoryChange"
               @priceChange="priceChange"
    />
  </div>

</template>

<script>
import {GetSearchData, GetSearchInterfaceData, GetRealTimeSearchData} from "@/request/api";
import HistoryHot from "@/components/HistoryHot";
import MyProduct from "@/components/MyProduct";
import PromptList from "@/components/PromptList";

export default {
  components: {HistoryHot, MyProduct, PromptList},
  name: "searchInterface",
  data() {
    return {
      iptVal: "",
      iptPlaceholder: "",
      // 1.历史记录 热门搜索
      // 2.代表列表区块
      // 3.代表产品区块
      blockShow: 1,
      // 历史区块的数组
      historyKeywordList: [],
      // 热门搜索的数组
      hotKeywordList: [],
      // 传递给MyProduct组件的分类数据
      filterCategory: [],
      goodsList: [],
      // 价格排序id
      order: "desc",
      // 分类id,id就是默认的排序方式
      categoryId: 0,
      // 排序方式
      sort: "id",
      // PromptList组件的数组
      listArr: []
    }
  },
  created() {
    this.getAllSearchInterfaceData()
  },

  methods: {
    // 子传父 分类实现
    categoryChange(val) {
      // 调用onSearch方法
      this.categoryId = val
      this.onSearch()
    },
    // 子传父 价格顺序
    priceChange(val) {
      this.order = val
      console.log(this.order)
      this.sort = 'price'
      this.onSearch()
    },
    // 搜索方法实现
    onSearch() {
      let _this = this
      GetSearchData({
        keyword: this.iptVal,
        categoryId: this.categoryId,
        sort: this.sort,
        order: this.order,
        page: 1,
        size: 20
      }).then(res => {
        console.log(res)
        if (res.errno === 0) {
          this.blockShow = 3
          let {filterCategory, goodsList} = res.data
          _this.filterCategory = JSON.parse(JSON.stringify(filterCategory)
              .replace(/name/g, 'text')
              .replace(/id/g, 'value'))
          _this.goodsList = goodsList
        }
      })
    },
    // 取消按钮的点击事件
    onCancel() {
      this.$router.go(-1)
    },
    // 获取所有搜索页界面数据
    getAllSearchInterfaceData() {
      GetSearchInterfaceData()
          .then(result => {
            console.log(result)
            if (result.errno === 0) {
              let {defaultKeyword, historyKeywordList, hotKeywordList} = result.data
              this.iptPlaceholder = defaultKeyword.keyword
              this.historyKeywordList = historyKeywordList
              this.hotKeywordList = hotKeywordList
            }
          })
    },
    // 实时搜索
    onInput() {
      this.blockShow = 2
      GetRealTimeSearchData({
        keyword: this.iptVal
      })
          .then(res => {
            if (res.errno === 0) {
              this.listArr = res.data
            }
          })
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
  background: #efefef;
}
</style>
