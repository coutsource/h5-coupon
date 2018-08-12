<template>
  <div class="page orderpage">
    <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
      <headersec tabname="我的订单" ref="noback"></headersec>
      <ordertab :urlRouter="$route.path"></ordertab>
      <transition :name="slidename">
        <div class="container" v-show="mainarea">
          <div v-show="!havePage">
            <nopage></nopage>
          </div>
          <div class="order-item" v-show="havePage" v-cloak>
            <div v-for="itemPay in $store.state.pays">
              <div class="order-top flex-between">
                <p>订单号xxxxx</p>
              </div>
              <div class="order-content">
                <van-row type="flex" justify="space-between">
                  <van-col span="9">
                    <div class="order-img">
                      <img :src="itemPay.GoodsImage" />
                    </div>
                  </van-col>
                  <van-col span="9">
                    <div class="order-text">
                      <p class="goods-name text-ellipsis">{{itemPay.GoodsName}}</p>
                      <p class="goods-num">x{{itemPay.GoodsNum}}</p>
                      <p class="goods-price">¥{{itemPay.GoodsPrice}}</p>
                    </div>
                  </van-col>
                  <van-col span="6">
                    <van-button size="small" type="primary" @click="viewLogistics">查看物流</van-button>
                  </van-col>
                </van-row>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </v-touch>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import Ordertab from '../base/OrderTab.vue'
import { mapGetters, mapMutations } from 'vuex'
import { Button, Row, Col } from 'vant'
export default {
  data() {
    return {
      havePage: false,
      mainarea: false,
      slidename: 'slide-go'
    }
  },
  components: {
    Headersec,
    Ordertab,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col
  },
  computed: {
    ...mapGetters([
      'this.$store.state.pays',
      'this.$store.state.ordercur'
    ])
  },
  mounted() {
    this.havePage = true
    this.mainarea = true
    this.$refs.noback.isBack = false
    this.setOrdercur(4)
    if (this.$store.state.ordercur < this.$store.state.ordertab) {
      this.slidename = 'slide-back'
    } else {
      this.slidename = 'slide-go'
    }
    this.setOrdertab(4)
  },
  methods: {
    onSwipeLeft() {
      this.$router.push('./orderdown')
    },
    onSwipeRight() {
      this.$router.push('./waitdeliver')
    },
    ...mapMutations({
      setOrdercur: 'SET_ORDERCUR',
      setOrdertab: 'SET_ORDERTAB'
    }),
    viewLogistics() {
      this.$router.push('./logisticsstep')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/less/variable.less';
.container {
    padding-top: 1.6rem;
}

.order-item {
    padding-bottom: .2rem;
    border-bottom: 1px solid #ccc;
    margin-bottom: .2rem;
}

.order-top {
    height: .8rem;
    font-size: .28rem;
    line-height: .8rem;
    padding: 0 .2rem;
    border-bottom: 1px solid #ccc;
}

.order-content {
    padding-top: .2rem;
}
</style>
