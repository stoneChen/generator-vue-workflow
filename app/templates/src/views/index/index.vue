<template>
  <div>
    <div>Count: {{count}}</div>
    <button @click="add">add</button>
  </div>
</template>

<script type="text/babel">
  import { doSample } from 'action/sample-actions'
  export default {
    vuex: {
      getters: {
        count: state => state.counter.count
      },
      actions: {
        doSample
      }
    },
    methods: {
      add (e) {
        e.preventDefault()
        this.doSample()
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>

</style>
