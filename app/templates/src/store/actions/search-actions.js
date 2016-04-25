import Vue from 'vue'
import {
  SET_ZHIHU_SEARCH_RESULT,
} from '../mutation-types'

export function searchFromZhihu ({ dispatch }, keywords) {
  Vue.http.get(`/autocomplete?token=${keywords}&max_matches=10&use_similar=0`).then(res => {
    console.log(res.data)
    dispatch(SET_ZHIHU_SEARCH_RESULT, res.data)
  })
}
