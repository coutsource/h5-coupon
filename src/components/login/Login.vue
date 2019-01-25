<template>
  <div class="page">
    <!-- <Header tabname="登录"></Header> -->
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <div v-show="!havePage">
          <no-page></no-page>
        </div>
        <div v-show="havePage">
          <van-row class="pt-head">
            <van-col :offset=4 :span=16 class="center-image-box">
              <img src="../../../static/img/login/exchange_center.jpeg" alt="exchange_center">
            </van-col>
            <van-col :offset=2 :span=20>
              <van-cell-group class="form-group">
                <van-field
                  v-model="number"
                  type="text"
                  placeholder="请输入卡号"
                  :error="numError.error"
                  :error-message="numError.msg"
                  @keypress="clearError()"
                />
                <van-field
                  autofocus
                  v-model="passwd"
                  placeholder="请输入卡密"
                  :type="passwdType"
                  :icon="isShowPasswd ? 'password-view' : 'password-not-view'"
                  :error="pwdError.error"
                  :error-message="pwdError.msg"
                  @click-icon="toggleShowPasswd()"
                  @keypress="clearError()"
                />
              </van-cell-group>
            </van-col>
            <van-col :offset=2 :span=20 class="submit-btn">
              <van-button size="large" type="primary" @click="submit">立即领取</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from '../base/Header.vue'
import NoPage from '../base/NoPage.vue'
import { CellGroup, Field, Row, Col, Button } from 'vant'
import { mapGetters, mapMutations } from 'vuex'
// import md5 from 'js-md5'
export default {
  data() {
    return {
      slidename: 'slide-back',
      havePage: false,
      mainarea: false,
      isShowPasswd: false,
      number: '',
      passwd: '',
      numError: { error: false, msg: '' },
      pwdError: { error: false, msg: '' }
    }
  },
  mounted() {
    const vm = this
    if (this.$route.query.number) {
      this.number = this.$route.query.number
    }
    vm.mainarea = true
    vm.havePage = true
    if (this.islogin) {
      let redirect = '/login'
      if (this.$route.query.redirect) {
        redirect = this.$route.query.redirect
      }
      this.$router.push({
        path: redirect
      })
    }
  },
  computed: {
    ...mapGetters([
      'islogin'
    ]),
    passwdType() {
      if (!this.isShowPasswd) {
        return 'password'
      }
      return 'text'
    },
    validate() {
      if (!this.number) {
        return { result: false, numError: { error: true, msg: '该字段必填' }}
      }
      if (!this.passwd) {
        return { result: false, pwdError: { error: true, msg: '该字段必填' }}
      }
      return { result: true }
    }
  },
  methods: {
    submit() {
      if (this.validate.result) {
        const params = {
          code: this.number,
          passwd: this.passwd
        }
        this.$http.post('/api/conversion_codes/login', params).then((res) => {
          if (res.status === 200 && res.data.code === 200) {
            this.$router.push({
              path: '/index'
            })
            this.setLogin(true)
            this.addCard(this.number)
            this.setUser(res.data.user)
            this.setToken('Bearer ' + res.data.user.api_token)
          } else {
            this.numError.msg = '用户名或者密码不正确'
            this.pwdError.msg = '用户名或者密码不正确'
            return
          }
        })
          .catch(function(error) {
            console.log(error)
          })
      } else {
        if (this.validate.numError) {
          this.numError = this.validate.numError
        } else {
          this.pwdError = this.validate.pwdError
        }
      }
    },
    toggleShowPasswd() {
      this.isShowPasswd = !this.isShowPasswd
    },
    clearError() {
      this.numError = { error: false, msg: '' }
      this.pwdError = { error: false, msg: '' }
    },
    ...mapMutations({
      setLogin: 'SET_LOGIN',
      addCard: 'ADD_CARD',
      setUser: 'SET_USER',
      setToken: 'SET_TOKEN'
    })
  },
  components: {
    Header,
    NoPage,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button
  }
}
</script>

<style lang="less" scoped>
.pt-head {
  padding-top: 0.6rem;
}
.center-image-box {
  text-align: center;
  img {
    width: 100%;
  }
}
.form-group {
  margin-top: 1.6rem;
}
.submit-btn {
  margin-top: 0.6rem;
  margin-bottom: 1rem;
}
</style>

