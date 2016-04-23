import {
  SAMPLE
} from '../mutation-types'

const state = {
  count: 0
}

const mutations = {
  [SAMPLE] (state) {
    state.count++
  }
}

export default {
  state,
  mutations
}
