<template>
  <div class="page">
    <headersec tabname="购物车"></headersec>
    <transition :name="slidename">
      <div class="container" v-show="mainarea">
        <div v-show="!havePage">
          <nopage></nopage>
        </div>
        <div v-show="havePage">
          <div class="cart-item" :class="{selected: itemIndex === cartIndex}" v-for="(cartItem,cartIndex) in $store.state.carts">
            <v-touch @swipeleft="onSwipeLeft(cartIndex)" @swiperight="onSwipeRight(cartIndex)">
              <div class="cart-content flex-align-center">
                <div class="goods-radio">
                  <van-checkbox v-model="cartItem.goodsRadio" @change="onGoodsRadio(cartItem)"></van-checkbox>
                </div>
                <div class="flex">
                  <div class="goods-img" @click="onDetail(cartItem)">
                    <img v-lazy="cartItem.GoodsImage" />
                  </div>
                  <div class="goods-textBox">
                    <p class="goods-name">{{cartItem.GoodsName}}</p>
                    <div class="goodsOp flex">
                      <img src="../../../static/img/icon/shop_cut.png" @click.stop="onCutCart(cartItem)" />
                      <input type="text" :value="cartItem.GoodsNum" />
                      <img src="../../../static/img/icon/shop_add.png" @click.stop="onAddCart(cartItem)" />
                    </div>
                    <p class="goods-coach">¥{{cartItem.GoodsPrice}}</p>
                  </div>
                </div>
              </div>
              <!--v-show="itemIndex === cartIndex"-->
              <div class="remove" @click.stop="onRemove(cartItem)"><img src="../../../static/img/icon/remove.png" /></div>
            </v-touch>
          </div>
        </div>
      </div>
    </transition>
    <van-submit-bar
      class="submitCart"
      :price="allCoachNum"
      button-text="提交订单"
      @submit="onOrder"
    >
      <van-checkbox class="selectAllbox" v-model="goodsRadioAll" @change="onSelectAll()">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import Headersec from '../base/HeaderSec.vue'
import Footers from '../base/Footer.vue'
import Nopage from '../base/NoPage.vue'
import { mapGetters, mapMutations } from 'vuex'
import { SubmitBar, Checkbox, Toast } from 'vant'
export default {
  data() {
    return {
      goodsRadioAll: false,
      allCoach: 0,
      radioArr: [],
      havePage: false,
      itemIndex: '',
      slidename: 'slide-go',
      mainarea: false
    }
  },
  components: {
    Headersec,
    Footers,
    Nopage,
    [SubmitBar.name]: SubmitBar,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast
  },
  computed: {
    ...mapGetters([
      'this.$store.state.carts',
      'this.$store.state.comname'
    ]),
    allCoachNum() {
      return this.allCoach * 100
    }
  },
  mounted() {
    const that = this
    that.mainarea = true
    if (that.$store.state.carts.length == 0) {
      that.havePage = false
    } else {
      that.havePage = true
      that.$store.state.carts.forEach(function(item) {
        if (typeof item.goodsRadio == 'undefined') {
          that.$set(item, 'goodsRadio', false)
        }
      })
    }
    /* 判断动画是进还是出 */
    if (this.$store.state.comname === 'index' || this.$store.state.comname === 'category' || this.$store.state.comname === 'goodsdetail') {
      this.slidename = 'slide-go'
    } else {
      this.slidename = 'slide-back'
    }
    this.setComname('cart')
    this.onCalAllCoach()
  },
  methods: {
    /* 选择单个商品 */
    onGoodsRadio(item) {
      const that = this
      that.radioArr = []
      that.$store.state.carts.forEach(function(itemGoods) {
        that.radioArr.push(itemGoods.goodsRadio)
      })
      if (that.radioArr.indexOf(false) == -1) {
        that.goodsRadioAll = true
      } else {
        that.goodsRadioAll = false
      }
      that.onCalAllCoach()
    },
    /* 选择全部商品 */
    onSelectAll() {
      console.log(this.goodsRadioAll)
      if (this.goodsRadioAll) {
        this.$store.state.carts.forEach(function(item) {
          item.goodsRadio = true
        })
      } else {
        this.$store.state.carts.forEach(function(item) {
          item.goodsRadio = false
        })
      }
      this.onCalAllCoach()
    },
    /* 添加商品数量 */
    onAddCart(item) {
      item.GoodsNum++
      this.onCalAllCoach()
    },
    /* 减少商品数量 */
    onCutCart(item) {
      if (item.GoodsNum > 1) {
        item.GoodsNum--
        this.onCalAllCoach()
      }
    },
    /* 计算价格 */
    onCalAllCoach() {
      const that = this
      that.allCoach = 0
      that.$store.state.carts.forEach(function(item) {
        if (item.goodsRadio) {
          that.allCoach += item.GoodsNum * item.GoodsPrice
        }
      })
    },
    /* 删除商品 */
    onRemove(item) {
      const index = this.$store.state.carts.indexOf(item)
      this.$store.state.carts.splice(index, 1)
      this.itemIndex = ''
    },
    /* 提交订单 */
    onOrder() {
      const orderArr = []
      this.$store.state.carts.forEach(function(item) {
        if (item.goodsRadio) {
          orderArr.push(item)
        }
      })
      if (orderArr.length) {
        this.$router.push('orderwait')
        this.setOrders(orderArr)
      } else {
        Toast('请选择商品')
      }
    },
    /* 向左滑出现删除 */
    onSwipeLeft(index) {
      this.itemIndex = index
    },
    /* 向右滑隐藏删除 */
    onSwipeRight() {
      this.itemIndex = ''
    },
    /* 进入商品详情 */
    onDetail(item) {
      this.$router.push('/detail')
      this.setGoods(item)
    },
    ...mapMutations({
      setOrders: 'SET_ORDERS',
      setGoods: 'SET_GOODS',
      setComname: 'SET_COMNAME'
    })
  }
}
</script>

<style lang="less" scoped>
    @import '../../../static/less/variable.less';
    .container {
        padding-bottom: 1.6rem;
        overflow-x: hidden;
    }
    
    .cart-item {
        border-bottom: 1px solid #CCCCCC;
        padding-top: .2rem;
        height: 2.4rem;
        -webkit-transition: all 0.3s linear;
        -webkit-user-select: none;
        position: relative;
    }
    
    .remove {
        background: linear-gradient(90deg, #9bbeff 0%, #6495ED 100%);
        width: 18%;
        height: 2.6rem;
        line-height: 2.6rem;
        text-align: center;
        text-decoration: none;
        position: absolute;
        right: -18%;
        top: 0;
        img {
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 20%;
            width: .4rem;
            height: .4rem;
        }
    }
    
    .cart-content {
        width: 100%;
    }
    
    .selected {
        -webkit-transform: translate(-12%, 0);
        -webkit-transition: all 0.3s linear;
    }
    
    .goods-radio {
        margin: 0 .2rem;
        width: .37rem;
        height: .37rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    
    .goods-img {
        margin-right: .2rem;
        width: 2rem;
        height: 2rem;
        img {
            width: 100%;
            height: 100%;
        }
    }
    
    .goods-name {
        font-size: .28rem;
    }
    
    .goods-coach {
        font-size: .24rem;
        color: red;
        align-self: flex-end;
    }
    
    .goodsOp {
        margin: .4rem 0;
        img {
            width: .34rem;
            height: .34rem;
        }
        input {
            border: none;
            font-size: .28rem;
            text-align: center;
            width: .6rem;
        }
    }
    
    .cartBottom-detail {
        height: .8rem;
        line-height: .8rem;
        font-size: .28rem;
        width: 100%;
        position: absolute;
        bottom: .8rem;
        color: @base_color;
        background: @theme_background;
        /*background:red;*/
        img {
            vertical-align: middle;
            margin: 0 .2rem;
            width: .3rem;
            height: .3rem;
        }
    }
    .submitCart {
      background-color: #d9d9d9;
    }
    .selectAllbox {
      margin-left: 0.2rem;
    }
</style>