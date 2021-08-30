<template>
  <div v-if="store.states.current.length"
       v-for="obj in store.cache.plots"
       :key="obj.value"
  >
    <Plot v-if="ifActive(obj.value)"
          :value="obj.value"
          :name="obj.name"
          :num="num"
    />
  </div>
  <h1 v-else> Upload data to activate plots. </h1>
</template>

<script>
  import Plot from './SubComponents/Plot.vue'

  export default {
    inject: ['store'],
    components: { Plot },
    computed: {
      num: function() {
        let count = 0
        this.store.states.current.forEach(obj => {
          if (obj.dataPlotLocation > count) {
            count = obj.dataPlotLocation
          }
          if (obj.indexPlotLocation > count) {
            count = obj.indexPlotLocation
          }
        });
        this.store.cache.activePlotNUM = count
        return count
      }
    },
    methods: {
      ifActive: function(val) {
        return this.store.states.current.some(o => (o.dataPlotLocation == val || o.indexPlotLocation == val))
      }
    }
  }
</script>

<style scoped>
  h1 {
    margin: auto;
    font-family: Sans-serif;
    font-weight: bold;
    color: black;
  }
</style>
