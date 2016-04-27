<template>
  <div>
    <div>Count: {{count}}</div>
    <button @click="add">add</button>
    <hr>
    <input type="text" v-model="keywords" @keyup.enter="doSearch">
    <button @click="doSearch">知乎搜索</button>
    <p>搜索结果:</p>
    <table>
      <tr v-for="ret in searchResults">
        <td>{{ret[0]}}</td>
        <td>{{ret[1]}}</td>
        <!--<td>{{ret[2]}}</td>-->
        <!--<td>{{ret[3]}}</td>-->
      </tr>
    </table>
  </div>
</template>

<script type="text/babel">
//  import Vue from 'vue'
  import { doSample } from 'actions/sample-actions'
  import { searchFromZhihu } from 'actions/search-actions'
  export default {
    vuex: {
      getters: {
        count: state => state.counter.count,
        searchResults: state => {
          return state.searchResult.result[0].filter((ret, i) => {
            return i > 0
          })
        },
      },
      actions: {
        doSample,
        searchFromZhihu,
      },
    },
    data () {
      return {
        keywords: 'vuejs',
      }
    },
    methods: {
      add (e) {
        e.preventDefault()
        this.doSample()
      },
      doSearch () {
        this.searchFromZhihu(this.keywords)
      },
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>
