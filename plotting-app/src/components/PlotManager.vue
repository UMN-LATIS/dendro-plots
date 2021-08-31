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
  <h1 v-else> Upload data to activate plots. </h1>
</template>

<script>
  import Plot from './SubComponents/Plot.vue'

  export default {
    inject: ['store'],
    components: { Plot },
    data() {
      return {
        count: 0,
      }
    },
    computed: {
      activePlots: function() {
        for (const b of this.store.states.current) {
          console.log(b.indexPointsFreq)
        }

        return this.store.cache.plots.filter(obj => {
          return this.store.states.current.some(o => (o.dataPlotLocation == obj.value && (o.dataPointsActive || o.dataSplineFreq))
                                                  || (o.indexPlotLocation == obj.value && (o.indexPointsFreq || o.indexSplineFreq)))
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
