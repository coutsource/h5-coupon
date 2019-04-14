<template>
  <div class="page">
    <headersec tabname="全部订单" ref="noback"></headersec>
    <div class="container">
      <div v-for="itemOrder in orders" :key="itemOrder.no">
        <van-row type="flex">
          <van-col span="18" offset="1">订单编号: {{ itemOrder.no }}</van-col>
        </van-row>
        
        <div v-for="itemGoods in itemOrder.goodsItems" :key="itemGoods.id">
          <van-card
            num="1"
            price="0.00"
            :title="itemGoods.title"
            :thumb="itemGoods.image"
          >
          </van-card>
        </div>

        <van-row type="flex">
          <van-col span="6" offset="18">订单状态: {{ itemOrder.status }}</van-col>
        </van-row>

      </div>
    </div>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import Nopage from '../base/NoPage.vue'
import { mapGetters, mapActions } from 'vuex'

import { Card, Button, Toast, Row, Col } from 'vant'

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
    Nopage,
    [Card.name]: Card,
    [Button.name]: Button,
    [Toast.name]: Toast,
    [Row.name]: Row,
    [Col.name]: Col
  },
  computed: {
    ...mapGetters([
      'orders',
      'authtoken'
    ])
  },
  mounted() {
    this.getOrders(this.authtoken)
    this.mainarea = true
    this.havePage = true
    this.$refs.noback.isBack = false

    if (this.orders.length == 0) {
      Toast('暂时还没有订单')
    }
  },
  methods: {
    ...mapActions([
      'getOrders'
    ]),
    query() {
      window.location = 'https://www.ickd.cn/'
    },
    shipStatus(status) {
      return shipStatusMap[status]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../static/less/variable.less';
.container {
    margin-top: 0.2rem;
}
</style>
