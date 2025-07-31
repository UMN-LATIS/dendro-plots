<!--
  Purpose:
    Creates Plotly plot to display user slected data.

  Props:
    id:
      ID of dataset. Allows for getting and setting of dataset properties.
    name:
      Plot title displayed.
    count:
      Total number of plots present in app. Important for height calculation.
    legend:
      String or null value which determines legend presence and orientation.

  Computed:
    divID:
      Returns random 5 digit number to use as an ID for div hosting Plotly plot.
    layout:
      Returns object with Plotly layout attributes. Used to correctly generate
      plot.
    config:
    Returns object with Plotly config attributes. Used to correctly generate
    plot.

  Methods:
    resizePlot:
      Re-renders plot with correct width and height. Width and height found by
      window size and accounting for given plto count.
    createPlot:
      Initialzies Plotly plot.
    updatePlot:
      Similar to createPlot(), but it uses a faster Plotly function to render plot.
    highlightPlot:
      Highlights a year corresponding to a point hovered over in DendroElevator.
-->

<template>
  <div class="plotly-div"
       :ref="divID">
  </div>
</template>

<script>
  import Plotly from 'plotly.js'
  import formatTraces from '../../modules/traces.js'

  export default {
    inject: ['store'],
    props: ['id', 'name', 'count', 'legend'],
    data() {
      return {
        medianA: this.store.cache.states.find(o => o.id === this.store.cache.medianIDs[0]),
        medianB: this.store.cache.states.find(o => o.id === this.store.cache.medianIDs[1]),
        plot: null,
      }
    },
    computed: {
      divID: function() {
        return String(Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000)
      },
      layout: function() {
        let obj = new Object()
        obj.dragmode = 'pan'
        obj.title = {
          text: this.name,
          x: 0,
          pad: {
            l: 20,
          }
        }
        obj.showlegend = (this.legend) ? true : false;
        obj.legend = {
          title: {
            text: 'Legend',
          },
          orientation: this.legend
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
        obj.shapes = []

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
        if (this.$refs[this.divID]) Plotly.relayout(this.$refs[this.divID], { width: w, height: h })
      },
      createPlot: async function() {
        let traces = await Promise.all(formatTraces(this.id))
        if (this.$refs[this.divID]) this.plot = Plotly.newPlot(this.$refs[this.divID], traces, this.layout, this.config)
        this.resizePlot()
      },
      updatePlot: async function() {
        let traces = await Promise.all(formatTraces(this.id))
        if (this.$refs[this.divID]) Plotly.react(this.$refs[this.divID], traces, this.layout, this.config)
        this.resizePlot()
      },
      highlightPlot: async function() {
        let plot = await this.plot
        let range = plot.layout.xaxis.range
        let boundary = 0.0015 * Math.abs(range[1] - range[0])
        let tw = this.store.states.current.find(o => o.id == 0)
        let color = tw.color
        let highlights
        if (this.store.cache.hightlightYear || this.store.cache.hightlightYear === 0) {
          highlights = [
                        {
                            type: 'rect',
                            xref: 'x',
                            yref: 'paper',
                            x0: this.store.cache.hightlightYear - boundary,
                            y0: 0,
                            x1: this.store.cache.hightlightYear + boundary,
                            y1: 1,
                            fillcolor: color,
                            opacity: 0.5,
                            line: {
                                  width: 0,
                                  color: '#b2182b'
                              }
                          },
                      ]
        }

        (highlights) ? (this.layout.shapes = highlights) : (this.layout.shapes = [])

        if (this.$refs[this.divID]) Plotly.relayout(this.$refs[this.divID], this.layout)
      }
    },
    watch: {
      'store.cache.updatePlotSwitch': {
        handler: function() {
          this.updatePlot()
        },
        deep: true
      },
      'store.states.current': {
        handler: function() {
          this.updatePlot()
        },
        deep: true
      },
      'store.cache.hightlightYear': {
        handler: function() {
          this.highlightPlot()
        },
        deep: true
      },
      medianA: {
        handler: function() {
          this.updatePlot()
        },
        deep: true
      },
      medianB: {
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
      this.createPlot()
      window.addEventListener('resize', () => {
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