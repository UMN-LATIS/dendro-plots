<template>
  <div class="dropdown">
    <img :src="srcPath"
         @click="onClick"
    >
    <div class="dropdown-content">
      <p class="info"> {{ legendText[legendType] }} </p>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    data() {
      return {
        legendType: 0,
        genText: ['Legend off', 'Legend vertical', 'Legend horizontal'],
      }
    },
    computed: {
      srcPath: function() {
        return require('../../assets/legend-' + this.id + '.png')
      },
      legendText: function() {
        let arr = []
        for (let text of this.genText) {
          arr.push('Plot ' + this.id + ': ' + text)
        }
        return arr
      }
    },
    methods: {
      onClick: function() {
        /*
          Legend type code:
            0 = Vertical
            1 = Horizontal
            2 = None
        */
        let orientation
        switch (this.legendType) {
          case 0:
            orientation = 'v'
            break;
          case 1:
            orientation = 'h'
            break;
          case 2:
            orientation = false
            break;
        }
        this.store.methods.updateCache('plots', this.id, 'legend', orientation)
        this.store.cache.updatePlotSwitch = !this.store.cache.updatePlotSwitch

        this.legendType++
        if (this.legendType > 2) {
          this.legendType = 0
        }
      }
    },
  }
</script>

<style scoped>
  img {
    width: 18px;
    height: 18px;
    margin-bottom: -2px;
    cursor: pointer;
  }

  .info {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    width: max-content;
  }

  .dropdown {
    height: 20px;
    width: 20px;
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: 22px;
    margin-left: -20px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
    display: inline;
  }

</style>
