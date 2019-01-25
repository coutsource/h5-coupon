import * as types from './mutation-types'
const cartArr = []
const addressArr = []
const matutaions = {
  /* 用户登录 */
  [types.SET_LOGIN](state, islogin) {
    state.islogin = islogin
  },
  [types.SET_LOGOUT](state, islogin) {
    state.islogin = islogin
  },
  [types.SET_USER](state, user) {
    state.user = user
  },
  [types.SET_TOKEN](state, token) {
    state.authtoken = token
  },
  /* 卡片管理 */
  [types.ADD_CARD](state, card) {
    state.cards.push(card)
  },
  /* 广告管理 */
  [types.HIDE_ADERVTISING](state, ishide) {
    state.showadvertising = !ishide
  },
  /* 商品详情 */
  [types.SET_GOODS](state, goods) {
    state.goods = goods
  },
  /* 购物车 */
  [types.SET_CARTS](state, carts) {
    if (carts.GoodsNum === 0) {
      carts.GoodsNum = 1
    }
    cartArr.push(carts)
    state.carts = cartArr
  },
  /* 订单 */
  [types.SET_ORDERS](state, orders) {
    state.orders = orders
  },
  /* 支付 */
  [types.SET_PAYS](state, pays) {
    state.pays = pays
  },
  /* 地址 */
  [types.SET_ADDRESS](state, address) {
    addressArr.push(address)
    state.address = addressArr
  },
  [types.EDIT_ADDRESS](state, address) {
    addressArr.forEach((item, index) => {
      if (item.id === address.id) {
        addressArr[index] = address
      }
    })
    state.address = addressArr
  },
  /* 地址 */
  [types.DEL_ADDRESS](state, id) {
    const address = []
    addressArr.forEach((item) => {
      if (item.id !== id) {
        address.push(item)
      }
    })
    state.address = address
  },
  /* 选择地址 */
  [types.SET_CHOOSEADDRESS](state, chooseaddress) {
    state.chooseaddress = chooseaddress
  },
  [types.SET_DEFAULTADDRESS](state, defaultaddress) {
    state.defaultaddress = defaultaddress
  },
  /* 购物地址 */
  [types.SET_ISCHOOSE](state, ischoose) {
    state.ischoose = ischoose
  },
  /* 组件下标 */
  [types.SET_TABINDEX](state, tabindex) {
    state.tabindex = tabindex
  },
  /* 组件名字 */
  [types.SET_COMNAME](state, comname) {
    state.comname = comname
  },
  /* 当前订单状态下标 */
  [types.SET_ORDERCUR](state, ordercur) {
    state.ordercur = ordercur
  },
  /* 订单状态下标 */
  [types.SET_ORDERTAB](state, ordertab) {
    state.ordertab = ordertab
  },
  [types.SUBMIT_ORDER](state, order) {
    const orderItem = {
      detail: order,
      status: 'SUBMIT'
    }
    state.orders.push(orderItem)
  }
}
export default matutaions