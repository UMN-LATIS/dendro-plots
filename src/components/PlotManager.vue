<template>
  <div v-if="store.states.current.length">
    <div v-for="obj in activePlots"
         :key="obj.value"
    >
      <Plot :value="obj.value"
            :name="obj.name"
            :count="activePlots.length"
      />
    </div>
    <h1 v-if="!activePlots.length"> Modify options to activate plots. </h1>
  </div>
  <h1 v-else-if="store.states.past.length || store.states.future.length"> Upload data to activate plots. </h1>
  <h1 v-else> Loading... </h1>
</template>

<script>
  import Plot from './SubComponents/Plot.vue'

  export default {
    inject: ['store'],
    components: { Plot },
    computed: {
      activePlots: function() {
        return this.store.cache.plots.filter(obj => {
          let statePlotActive = this.store.states.current.some(o => (o.rawPlotLocation == obj.value && (o.rawPointsActive || o.rawSplineFreq))
                                                                 || (o.indexPlotLocation == obj.value && (o.indexPointsFreq || o.indexSplineFreq)))
          let cachePlotActive = this.store.cache.states.some(o => (o.rawPlotLocation == obj.value && o.rawPointsActive)
                                                               || (o.indexPlotLocation == obj.value && o.rawPointsActive && o.indexPointsFreq))

          return statePlotActive || cachePlotActive
        })
      }
    },
  }
</script>

<style scoped>
  h1 {
    margin: auto;
    text-align: center;
    font-family: Sans-serif;
    font-weight: bold;
    color: black;
  }

  div {
    width: 100%;
    margin: auto;
  }
</style>
