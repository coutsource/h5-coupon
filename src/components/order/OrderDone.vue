<template>
  <div class="page">
    <headersec tabname="我的订单" ref="noback"></headersec>
    <div class="container">
      <div v-for="itemPay in pays.items" :key="itemPay.GoodsId">
        <van-card
          num="1"
          price="0.00"
          :title="itemPay.GoodsName"
          :thumb="itemPay.GoodsImage"
        >
          <div slot="footer">
            <van-button size="mini" v-on:click="query()">物流查询</van-button>
          </div>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import Nopage from '../base/NoPage.vue'
import { mapGetters, mapMutations } from 'vuex'

import { Card, Button } from 'vant'

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
    [Button.name]: Button
  },
  computed: {
    ...mapGetters([
      'pays'
    ])
  },
  mounted() {
    this.mainarea = true
    this.havePage = true
    this.$refs.noback.isBack = false
  },
  methods: {
    ...mapMutations({
    }),
    query() {
      window.location = 'https://www.ickd.cn/'
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
