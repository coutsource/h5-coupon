<template>
  <div class="page">
    <headersec tabname="订单详情"></headersec>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <div v-show="!havePage">
          <nopage></nopage>
        </div>
        <div v-show="havePage">
          <div class="chooseAddress" @click="onAddress()">
            <div class="flex-align-center chooseBox">
              <img src="../../../static/img/icon/item_address.png" />
              <div class="flex-align-center flex-between">
                <p v-show="!currentAddress">选择送货地址</p>
                <p v-show="currentAddress">{{this.$store.state.chooseaddress}}</p>
                <img src="../../../static/img/icon/arrowRight.png" alt="" />
              </div>
            </div>
          </div>
          <div class="orderItem flex" v-for="orderItem in $store.state.orders">
            <img :src="orderItem.GoodsImage" class="goodsImg" />
            <div>
              <p class="goods-name">{{orderItem.GoodsName}}</p>
              <p class="goods-num">x{{orderItem.GoodsNum}}</p>
              <p class="goods-price">¥{{orderItem.GoodsPrice}}</p>
            </div>
          </div>
          <van-cell-group>
            <van-cell title="兑换卡" :value="cellTip" @click="showList = true" />
          </van-cell-group>
          <div class="orderBottom flex-between">
            <span>总金额:{{allCoach}}</span>
            <span @click="onOrder">结算</span>
          </div>
        </div>
      </div>
    </transition>
    <van-popup v-model="showList" position="bottom">
      <van-coupon-list
        :show-exchange-bar="false"
        :show-close-button="false"
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        @change="onChange"
        @exchange="onExchange"
      />
    </van-popup>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import Nopage from '../base/NoPage.vue'
import { mapGetters, mapMutations } from 'vuex'
import { Cell, CellGroup, Popup, CouponCell, CouponList, Toast } from 'vant'

export default {
  data() {
    return {
      currentAddress: this.$store.state.chooseaddress,
      allCoach: 0,
      havePage: false,
      mainarea: false,
      slidename: 'slide-go',
      showList: false,
      chosenCoupon: -1,
      cellTip: '',
      isChooseCard: false,
      chooseCard: {},
      coupons: [{
        available: 1,
        discount: 0,
        denominations: 0,
        origin_condition: 0,
        reason: '',
        value: 100,
        name: this.$store.state.cards[this.$store.state.cards.length - 1],
        start_at: 1489104000,
        end_at: 1514592000
      }],
      disabledCoupons: []
    }
  },
  components: {
    Headersec,
    Nopage,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Popup.name]: Popup,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Toast.name]: Toast
  },
  computed: {
    ...mapGetters([
      'this.$store.state.cards',
      'this.$store.state.orders',
      'this.$store.state.chooseaddress',
      'this.$store.state.defaultaddress',
      'this.$store.state.comname'
    ])
  },
  mounted() {
    const that = this
    that.cellTip = '你有' + that.coupons.length + '个可用兑换卡'
    this.mainarea = true
    if (this.$store.state.orders === undefined) {
      that.havePage = false
    } else {
      that.havePage = true
      const sums = []
      this.$store.state.orders.forEach(function(item) {
        sums.push(item.GoodsPrice * item.GoodsNum)
      })
      for (var i = 0; i < sums.length; i++) {
        that.allCoach += parseInt(sums[i])
      }
    }
    /* 判断动画是进还是出 */
    if (this.$store.state.comname === 'goodsdetail' || this.$store.state.comname === 'cart') {
      this.slidename = 'slide-go'
    } else {
      this.slidename = 'slide-back'
    }
    this.setComname('orderwait')
  },
  methods: {
    /* 我的订单 */
    onOrder() {
      if (!this.currentAddress) {
        Toast('请选择收货地址')
        return
      }
      if (!this.isChooseCard) {
        Toast('请选择兑换卡')
      } else {
        this.$router.push('./order')
        this.setPays(this.$store.state.orders)
      }
    },
    /* 选择地址 */
    onAddress() {
      this.$router.push('./address')
    },
    onChange(index) {
      this.showList = false
      this.chosenCoupon = index
      this.isChooseCard = true
      this.chooseCard = this.coupons[index]
      this.cellTip = this.coupons[index].name
    },
    onExchange(code) {
      this.cellTip = code
    },
    ...mapMutations({
      setPays: 'SET_PAYS',
      setIschoose: 'SET_ISCHOOSE',
      setComname: 'SET_COMNAME'
    })
  }
}
</script>

<style lang="less" scoped>
  @import '../../../static/less/variable.less';
  .chooseBox {
    margin-top: .2rem;
    margin-bottom: .2rem;
    height: 1rem;
    padding: 0 .2rem;
    font-size: .28rem;
    border: 1px dashed @theme_background;
    img {
      width: .4rem;
      height: .4rem;
      margin-right: .2rem;
    }
    div {
      width: 100%;
    }
    p {
      text-align: center;
    }
  }

  .orderItem {
    padding: .2rem;
    border-bottom: 1px solid #ccc;
  }

  .goodsImg {
    width: 2rem;
    height: 2rem;
  }

  .orderBottom {
    position: fixed;
    bottom: 0;
    height: .8rem;
    background: @theme_background;
    width: 100%;
    color: @base_color;
    font-size: .28rem;
    line-height: .8rem;
    padding: 0 .2rem;
    box-sizing: border-box;
  }
</style>
