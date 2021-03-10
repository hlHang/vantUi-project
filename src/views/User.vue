<template>
  <div>
    <van-row @click="openModel">
      <van-col span="6">
        <img :src="avatarSrc" alt="">
      </van-col>
      <van-col span="10">{{ nickName }}</van-col>
      <van-col span="8">
        <van-icon name="arrow"/>
      </van-col>
    </van-row>

    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" text="文字" @click="iconPrompt"/>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
      <van-grid-item icon="photo-o" text="文字"/>
    </van-grid>

    <div class="login_model" v-if="showModel">
      <section @click="closeModel"></section>
      <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>

    </div>
  </div>
</template>

<script>
import {GoLogin} from "@/request/api";

export default {
  name: "User",
  data() {
    return {
      avatarSrc: require('@/assets/avatar.png'),
      username: '',
      password: '',
      showModel: false,
      // 昵称
      nickName: "点击登录"
    }
  },
  created() {
    // 每次进入user页面，直接判断有无token，如果有，就获取userInfo来渲染头像和昵称
    let token = localStorage.getItem('token')
    if (token) {
      let userInfo = localStorage.getItem('userInfo')
      let newUserInfo = JSON.parse(userInfo)
      this.avatarSrc = newUserInfo.avatar
      this.nickName = newUserInfo.username
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values["用户名"])
      console.log(values["密码"])
      GoLogin({
        username: values["用户名"],
        pwd: values["密码"]
      })
          .then(res => {
            console.log(res)
            let {token, userInfo} = res.data
            let newUserInfo = JSON.stringify(userInfo)
            localStorage.setItem('token', token)
            localStorage.setItem('userInfo', newUserInfo)
            this.$toast.success('登录成功')
            this.avatarSrc = userInfo.avatar
            this.nickName = userInfo.username
            // 关闭模态框
            setTimeout(() => {
              this.showModel = false
            }, 1000)
          })
    },
    openModel() {
      let token = localStorage.getItem('token')
      if (!token) {
        this.showModel = true
      }
    },
    closeModel() {
      this.showModel = false
    },
    iconPrompt() {
      this.$toast.fail('该功能暂未开放')
    }
  }
}
</script>

<style lang="less" scoped>
.van-row {
  padding: .2rem 4%;
  background: #333;
  color: #ffffff;

  .van-col {
    line-height: .8rem;
    font-size: .2rem;

    img {
      width: .8rem;
      border-radius: 50%;
      display: block;
    }

    &:last-child {
      text-align: right;
    }
  }


}

.login_model {
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 99;
  position: absolute;

  section {
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }

  .van-form {
    width: 90%;
    position: absolute;
    top: 40vh;
    left: 50%;
    margin-left: -45%;
    padding: .1rem;
    box-sizing: border-box;
    background: #ffffff;
  }
}
</style>
