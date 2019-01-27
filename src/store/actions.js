// import * as types from './mutation-types'
import axios from 'axios'

// axios.defaults.baseURL = 'http://admin.wsc18.cn'
axios.defaults.baseURL = 'http://localhost:8080'
axios.defaults.headers.post['Content-Type'] = 'application/json'

export const submitOrder = ({ commit }, token, data) => {
  return axios.post('/api/orders/store', data, {
    headers: {
      'Authorization': token
    }
  })
}