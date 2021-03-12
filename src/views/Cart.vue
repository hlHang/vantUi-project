<template>
  <div>
    <tips/>
    <!--
      disable=true 禁用状态
      -->
    <van-checkbox-group :disabled="isClicked"
                        v-model="result">
      <van-checkbox class="chx"
                    :name="item.product_id"
                    v-for="item in cartList"
                    :key="item.id"
                    @click="goodsClick(item)">
        <van-swipe-cell>
          <van-card
              :num="item.number"
              :price="item.retail_price"
              :title="item.goods_name"
              :thumb="item.list_pic_url"
          />
          <template #right>
            <van-button square text="删除" type="danger" :disabled="isClicked" class="delete-button"
                        @click="delCartsGoodsFn(item.product_id)"/>
          </template>
        </van-swipe-cell>

        <van-stepper v-show="isClicked"
                     @change="stepChange(item)"
                     v-model="item.number"
                     theme="round"
                     button-size="22"
                     disable-input/>
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checkedAll" :disabled="isClicked">全选</van-checkbox>
      <template #tip>
        累计共 <span>{{ cartTotal.checkedGoodsCount }}</span> 件商品，可点击
        <van-button :type="isClicked ? 'danger' : 'primary'" size="mini" @click="isClicked =! isClicked">
          {{ isClicked ? '完成编辑' : '编辑' }}
        </van-button>
        按钮进行商品数量修改
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import tips from "@/components/Tips";
import {GetCartInfoData, GoodsChecked, StepNumber, DelCartsGoods} from "@/request/api";

export default {
  name: "Cart",
  components: {tips},
  data() {
    return {
      // 复选框数组
      // cartList的数组项如果checked为1，就把product_id存进result
      result: [],

      // 商品列表数组
      cartList: [],
      // 购物车总数
      cartTotal: [],
      // 是否显示步进器
      isClicked: false
    }
  },
  computed: {
    // 全选
    checkedAll: {
      // 第二种方法
      // return this.cartTotal.checkedGoodsCount === this.cartTotal.goodsCount

      // eslint-disable-next-line vue/return-in-computed-property
      get() {
        return this.result.length === this.cartList.length
      },
      set(val) {
        let arr = []
        this.cartList.map(value => {
          arr.push(value.product_id)
        })
        GoodsChecked({
          // 即将变成选中状态
          isChecked: val ? 1 : 0,
          productIds: arr.join()
        }).then(response => {
          this.totalFn(response.data)
        })
      }
    }
  },
  created() {
    this.getAllCartInfo()
  },
  methods: {
    onSubmit() {
      this.$toast.success('已提交')
    },
    // 获取购物车所有信息
    getAllCartInfo() {
      GetCartInfoData()
          .then(response => {
            // 渲染(抽离)
            if (response.errno === 0) {
              this.totalFn(response.data)
            }
          })
    },
    // 封装传输数据方法
    totalFn(data) {
      let {cartList, cartTotal} = data
      this.cartList = cartList
      this.cartTotal = cartTotal
      // 清空result数组
      this.result = []
      // 判断checked===1，就把product_id加入result数组
      this.cartList.map((value) => {
        if (value.checked === 1) {
          this.result.push(value.product_id)
        }
      })
    },
    // 商品卡片点击状态
    goodsClick(item) {
      if (this.isClicked) {
        return
      } else {
        GoodsChecked({
          // 即将变成选中状态
          isChecked: item.checked === 1 ? 0 : 1,
          productIds: item.product_id.toString()
        }).then(response => {
          this.totalFn(response.data)
        })
      }
    },
    // 商品步进器事件
    stepChange(item) {
      StepNumber({
        number: item.number,
        goodsId: item.goods_id,
        id: item.id,
        productId: item.product_id
      })
          .then(response => {
            this.totalFn(response.data)
          })
    },
    // 删除购物车商品
    delCartsGoodsFn(productId) {
      DelCartsGoods({
        productIds: productId.toString()
      }).then(response => {
        this.totalFn(response.data)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.van-submit-bar {
  bottom: .5rem;
}

.chx {
  padding: .1rem 4%;
  background: #ffffff;
  border-bottom: 1px solid #cccccc;

  /deep/ .van-checkbox__label {
    flex: 1;
  }
}

.van-submit-bar__tip {
  height: .2rem;
  line-height: .2rem;
}

.van-stepper {
  text-align: right;
}

button {
  vertical-align: middle;
}

.delete-button {
  height: 100%;
}
</style>
