<template>
  <div>
    <div class="history">
      <div class="top">
        <h4>历史记录</h4>
        <van-icon name="delete"/>
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

export default {
  name: "HistoryHot",
  props: ['historyKeywordList', 'hotKeywordList'],
  data() {
    return {}
  },
  created() {
  },
  methods: {
    tagClick(item) {
      this.$emit('tagClick',item)
    }
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
