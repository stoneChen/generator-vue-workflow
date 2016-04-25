import {
  SAMPLE,
} from '../mutation-types'

const initialState = {
  count: 0,
}

const mutations = {
  [SAMPLE] (state) {
    state.count++
  },
}

export default {
  state: initialState,
  mutations,
}
