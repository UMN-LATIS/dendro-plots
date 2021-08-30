<template>
  <div class="plotly-div"
       :ref="divID"
       :style="{ height: height + 'px' }"
  >
  </div>
</template>

<script>
  import Plotly from 'plotly.js'

  export default {
    inject: ['store'],
    props: ['value', 'name', 'num'],
    components: { },
    computed: {
      height: function() {
        return window.innerHeight / this.num
      },
      divID: function() {
        return String(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000)
      },
      traces: function() {
        let arr = []

        // raw data toggle
        for (const obj of this.store.states.current) {
          if (obj.dataPointsActive && this.value == obj.dataPlotLocation) {
            let data = this.store.cache.data.find(o => o.id == obj.id)
            let trace = this.createTrace(obj.name, data.x, data.y, obj.color, "lines+markers")

            arr.push(trace)
          }
        }

        return arr
      },
      layout: function() {
        let obj = new Object()
        obj.title = {
          text: this.name,
          x: 0,
          pad: {
            l: 20,
          }
        }
        obj.showlegend = true
        obj.legend = {
          title: {
            text: 'Legend'
          }
        }
        obj.margin = {
          t: 60,
          b: 60,
          l: 60,
          r: 60,
        }
        return obj
      },
      config: function() {
        let obj = new Object()
        obj.responsive = false // causes mode bar issue when true
        obj.scrollZoom = true
        obj.displayModeBar = true
        obj.modeBarButtonsToRemove = ['pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d']
        obj.editable = true
        obj.displaylogo = false
        return obj
      }
    },
    methods: {
      createTrace: function(name, x, y, color, mode) {
        let trace = new Object()
        trace.name = name
        trace.x = x
        trace.y = y
        trace.line = { color: color}
        trace.mode = mode
        trace.type = 'scatter' // need scatter gl
        return trace
      },
    },
    watch: {
      'store.states.current': {
        handler: function() {
          Plotly.react(this.$refs[this.divID], this.traces, this.layout, this.config)
        },
        deep: true
      }
    },
    mounted() {
      Plotly.newPlot(this.$refs[this.divID], this.traces, this.layout, this.config)
    },
  }
</script>

<style scoped>
  .plotly-div {
    width: 100%;
  }
</style>
