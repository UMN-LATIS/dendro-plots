<template>
  <div class="plotly-div"
       :ref="divID"
  >
  </div>
</template>

<script>
  import Plotly from 'plotly.js'
  import formatTraces from '../../modules/traces.js'

  export default {
    inject: ['store'],
    props: ['value', 'name', 'count'],
    data() {
      return {
        median: this.store.cache.states.find(o => o.id === this.store.cache.medianID),
        loading: {
          layout: {
            title: {
              text: 'Loading...'
            },
            showlegend: false,
          },
          config: {
            displayModeBar: false,
            displaylogo: false,
          }
        }
      }
    },
    computed: {
      divID: function() {
        return String(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000)
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
        obj.showlegend = false
        obj.legend = {
          title: {
            text: 'Legend',
          },
          orientation: 'h'
        }
        obj.xaxis = {
          title: {
            text: '',
            font: {
              size: 12,
            }
          }
        }
        obj.yaxis = {
          title: {
            font: {
              size: 12,
            }
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
        obj.modeBarButtonsToRemove = ['select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d']
        obj.editable = true
        obj.displaylogo = false
        return obj
      },
    },
    methods: {
      resizePlot: function() {
        if (!this.$refs[this.divID]) {
          return
        }
        let w = document.getElementById('plot-management').offsetWidth;
        let h = window.innerHeight / this.count
        Plotly.relayout(this.$refs[this.divID], { width: w, height: h })
      },
      updatePlot: function() {
        Plotly.react(this.$refs[this.divID], [], this.loading.layout, this.loading.config)
        let traces = formatTraces(this.value)
        traces.then(val => {
          Plotly.react(this.$refs[this.divID], val, this.layout, this.config)
        })
      }
    },
    watch: {
      'store.states.current': {
        handler: function() {
          this.updatePlot()
        },
        deep: true
      },
      median: {
        handler: function() {
          this.updatePlot()
        },
        deep: true
      },
      count: {
        handler: function() {
          this.resizePlot()
        },
      },
    },
    mounted() {
      let traces = formatTraces(this.value)
      traces.then(val => {
        Plotly.newPlot(this.$refs[this.divID], val, this.layout, this.config)
        window.addEventListener('resize', () => {
          this.resizePlot()
        })
        this.resizePlot()
      })
    },
  }
</script>

<style scoped>
  .plotly-div {
    width: 100%;
  }

  .hide {
    display: none;
  }
</style>
