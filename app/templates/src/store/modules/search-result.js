import {
  SET_ZHIHU_SEARCH_RESULT,
} from '../mutation-types'

const initialState = {
  result: [[]],
}

const mutations = {
  [SET_ZHIHU_SEARCH_RESULT] (state, result) {
    state.result = result
  },
}

export default {
  state: initialState,
  mutations,
}
