<template>
  <div v-if="store.states.current.length">
    <Plot 
      :id="1"
      :name="'Raw Data'"
      :count="1"
      :legend="plotLegend[0]"
      v-if="rawActive"
    />

    <Plot 
      :id="2"
      :name="'Index Data'"
      :count="1"
      :legend="plotLegend[1]"
      v-if="!rawActive"
    />
    <!-- <div v-for="obj in activePlots"
         :key="obj.id"
    >
      <Plot :id="obj.id"
            :name="obj.name"
            :count="1"
            :legend="obj.legend"
            
      />
    </div> -->
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
          let statePlotActive = this.store.states.current.some(o => (o.rawPlotLocation == obj.id && (o.rawPointsActive || o.rawSplineFreq))
                                                                 || (o.indexPlotLocation == obj.id && (o.indexPointsFreq || o.indexSplineFreq)))
          let cachePlotActive = this.store.cache.states.some(o => (o.rawPlotLocation == obj.id && o.rawPointsActive)
                                                               || (o.indexPlotLocation == obj.id && o.rawPointsActive && o.indexPointsFreq))

          return statePlotActive || cachePlotActive
        })
      },
      rawActive: function() { return this.store.cache.rawPlotActive },
      plotLegend: function() {
        let legends = []
        for (let obj of this.store.cache.plots) {
          legends.push(obj.legend)
        }
        return legends
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
