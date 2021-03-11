<template>
  <div>
    <tips/>
    <van-checkbox-group v-model="result">
      <van-checkbox name="a">
        <van-card
            num="2"
            price="2.00"
            desc="描述信息"
            title="商品标题"
            thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        />
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
      <template #tip>
        累计共 <span>11</span> 件商品，可点击
        <van-button type="primary" size="mini">编辑</van-button>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import tips from "@/components/Tips";

export default {
  name: "Cart",
  components: {tips},
  data() {
    return {
      result: ["a"],
      checked: true
    }
  },
  methods: {
    onSubmit() {

    },
    onClickEditAddress() {

    }
  }
}
</script>

<style lang="less" scoped>
.van-submit-bar {
  bottom: .5rem;
}

.van-checkbox {
  padding: .1rem 4%;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;

  /deep/ .van-checkbox__label {
    flex: 1;
  }
}

.van-submit-bar__tip {
  font-size: 14px;
}
</style>
