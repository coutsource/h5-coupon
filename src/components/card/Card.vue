<template>
  <div class="page">
    <headersec tabname="我的兑换卡"></headersec>
    <transition name="slide-go">
      <div class="container" v-show="mainarea">
        <van-coupon-list
          :show-exchange-bar="false"
          :show-close-button="false"
          :editable="false"
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import { CouponList } from 'vant'

const getCoupons = (cards) => {
  const coupons = []
  cards.forEach((card) => {
    const used = card.used ? 1 : 0;
    coupons.push({
      available: used,
      discount: 0,
      denominations: 0,
      origin_condition: 0,
      reason: '',
      value: 150,
      name: card.code,
      start_at: card.not_before,
      end_at: card.not_after
    })
  })
  return coupons
}

export default {
  data() {
    return {
      mainarea: false,
      chosenCoupon: -1,
      // coupons: [{
      //   available: 1,
      //   discount: 0,
      //   denominations: 0,
      //   origin_condition: 0,
      //   reason: '',
      //   value: 150,
      //   name: this.$store.state.cards[this.$store.state.cards.length - 1],
      //   start_at: 1489104000,
      //   end_at: 1514592000
      // }],
      coupons: getCoupons(this.$store.state.cards),
      disabledCoupons: []
    }
  },
  components: {
    Headersec,
    [CouponList.name]: CouponList
  },
  mounted() {
    console.log(this.$store.state.cards)
    this.mainarea = true
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.container {
  text-align: center;
  img {
    margin-top: .3rem;
  }
  p {
    margin-top: .3rem;
    font-size: .28rem;
  }
}
</style>
