import * as types from './mutation-types'

export const submitOrder = ({ commit }, order) => {
  commit(types.SUBMIT_ORDER, order)
}