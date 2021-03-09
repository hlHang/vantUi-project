<template>
  <div class="popup">
    <van-search
        v-model="iptVal"
        show-action
        :placeholder="iptPlaceholder"
        @search="onSearch"
        @cancel="onCancel"
    />
    <HistoryHot
        :history-keyword-list="historyKeywordList"
        :hotKeywordList="hotKeywordList"
    ></HistoryHot>
  </div>

</template>

<script>
import {GetSearchInterfaceData} from "@/request/api";
import HistoryHot from "@/components/HistoryHot";

export default {
  components: {HistoryHot},
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
      historyKeywordList:[],
      hotKeywordList:[]
    }
  },
  created() {
    this.GetAllSearchInterfaceData()
  },

  methods: {
    onSearch() {
    },

    // 取消按钮的点击事件
    onCancel() {
      this.$router.go(-1)
    },
    GetAllSearchInterfaceData() {
      GetSearchInterfaceData()
          .then(result => {
            console.log(result)
            if (result.errno === 0) {
             let {defaultKeyword,historyKeywordList,hotKeywordList} = result.data
              this.iptPlaceholder = defaultKeyword.keyword
              this.historyKeywordList = historyKeywordList
              this.hotKeywordList = hotKeywordList
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
