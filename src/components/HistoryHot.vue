<template>
  <div>
    <div class="history" v-if="ifShowHistory">
      <div class="top">
        <h4>历史记录</h4>
        <van-icon name="delete" @click="ClearHistory"/>
      </div>
      <div class="down">
        <van-tag @click="tagClick(item)" v-for="(item, index) in historyKeywordList"
                 :key="index"
                 round
                 type="primary">{{ item }}
        </van-tag>

      </div>
    </div>

    <div class="history">
      <div class="top">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag
            @click="tagClick(item.keyword)"
            v-for="(item, index) in hotKeywordList"
            :key="index"
            round
            :type="item.is_hot===1 ? 'danger' : 'primary'">{{ item.keyword }}
        </van-tag>
        <!--   三元运算符     -->
      </div>
    </div>
  </div>
</template>

<script>
import {CleanHistoryData} from "@/request/api";

export default {
  name: "HistoryHot",
  props: ['historyKeywordList', 'hotKeywordList'],
  data() {
    return {
      ifShowHistory:true
    }
  },
  created() {
  },
  methods: {
    tagClick(item) {
      this.$emit('tagClick', item)
    },
    ClearHistory() {
      CleanHistoryData()
          .then(res => {
            console.log(res)
            if (res.errno === 0) {
              this.$toast.success("删除成功")
              setTimeout(() =>{
                this.ifShowHistory =false
              },1000)

            }
          })
    },
  }
}
</script>

<style lang="less" scoped>
.history {
  padding: 0 2%;
  background: #fff;
  margin-bottom: .2rem;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: .5rem;
    font-size: .2rem;

    h4 {
      font-weight: normal;
    }
  }

  .down {
    .van-tag {
      font-size: .14rem;
      margin-right: .1rem;
      margin-bottom: .1rem;
      padding: 0.03rem;

    }
  }
}
</style>
