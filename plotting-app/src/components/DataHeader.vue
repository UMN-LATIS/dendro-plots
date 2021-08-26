<template>
  <div v-if="store.cache.loadSequence.length">
    <div id="info-text">
      <Info :info="[]"
            :width="20" />
    </div>
    <p> Data </p>
    <Sort />

    <!--
    <div class="dropdown" v-if="store.cache.loadSequence.length" v-for="(text, index) in infoText" :key="index">
      <img class="info-icons" :class="infoID[index]" :src="infoPNG[index]">
      <div class="dropdown-content">
        <span> {{ text }} </span>
      </div>
    </div>
    -->
  </div>
</template>

<script>
  import Info from './DataComponents/Info.vue'
  import Sort from './DataComponents/Sort.vue'

  export default {
    inject: ['store'],
    components: { Info, Sort },
    data() {
      return {
        infoID: ['first', 'second', 'third', 'fourth', 'fifth'],
        infoPNG: [require('../assets/width-toggle-icon.png'),
                  require('../assets/width-spline-icon.png'),
                  require('../assets/index-toggle-icon.png'),
                  require('../assets/index-spline-icon.png'),
                  require('../assets/color-icon.png')],
        infoText: ['Show raw data',
                   'Spline for detrending',
                   'Show index of data',
                   'Spline for index',
                   'Change line color'],
      }
    },
  }
</script>

<style scoped>
  div {
    margin: 0;
    display: inline;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #797979;
    height: 18px;
    display: inline;
    margin: 0;
    margin-left: 25px;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 6px;
    cursor: pointer;
  }

  .info-icons {
    cursor: help;
  }

  .dropdown, .show:hover {
    cursor: normal;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
  }

  .dropdown-content {
    display: none;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -16px;
    margin-top: 22px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .first {
    margin-left: 5px;
  }

  #info-text {
    width: 20px;
    height: 20px;
    position: absolute;
  }

</style>
