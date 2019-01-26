import * as types from './mutation-types'
import axios from 'axios'

axios.defaults.baseURL = 'http://admin.wsc18.cn'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const submitOrder = ({ commit }, token, data) => {
  axios.post('/api/order/add', data, {
    headers: {
      'Authorization': token
    }
  }).then(function(res) {
    commit(types.SET_PAYS, data.order)
  })
    .catch(function(error) {
      console.log(error)
    })
}