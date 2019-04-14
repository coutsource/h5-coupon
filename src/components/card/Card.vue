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
import { mapGetters } from 'vuex'

const getCoupons = (cards) => {
  const coupons = []
  cards.forEach((card) => {
    if (!card.used) {
      coupons.push({
        available: 1,
        reason: '',
        value: 0,
        name: card.code,
        startAt: new Date(card.not_before).getTime() / 1000,
        endAt: new Date(card.not_after).getTime() / 1000,
        condition: '兑换卡，无门槛使用',
        valueDesc: '0.0',
        unitDesc: '元'
      })
    }
  })
  return coupons
}

const getDisabledCoupons = (cards) => {
  const coupons = []
  cards.forEach((card) => {
    if (card.used) {
      coupons.push({
        available: 1,
        reason: '',
        value: 0,
        name: card.code,
        startAt: new Date(card.not_before).getTime() / 1000,
        endAt: new Date(card.not_after).getTime() / 1000,
        condition: '兑换卡，无门槛使用',
        valueDesc: '0.0',
        unitDesc: '元'
      })
    }
  })
  return coupons
}

export default {
  data() {
    return {
      mainarea: false,
      chosenCoupon: -1,
      coupons: getCoupons(this.$store.state.cards),
      disabledCoupons: getDisabledCoupons(this.$store.state.cards)
    }
  },
  computed: {
    ...mapGetters([
      'this.$store.state.cards'
    ])
  },
  components: {
    Headersec,
    [CouponList.name]: CouponList
  },
  mounted() {
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
