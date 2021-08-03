<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <div id="file-mangement">
        <FileManager @fileLoad="passFiles" />
      </div>
      <div id="time-series-management">
        <DataManager v-if="files" :files="files" />
        <h2 v-else> No data loaded... </h2>
      </div>
    </div>

    <div id="plot-wrapper">
      <div id="plotly-width">
        <h1> Plotly Width Plot</h1>
      </div>
      <div id="plotly-index">
        <h1> Plotly Index Plot</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import simpleSmoothingSpline from 'simple-smoothing-spline'
  import Plotly from 'plotly.js-dist'

  import FileManager from './components/FileManager.vue'
  import DataManager from './components/DataManager.vue'

  export default {
    name: 'App',
    components: { FileManager, DataManager },
    data() {
      return {
        files: null,
      }
    },
    methods: {
      passFiles(loadedFiles) {
        this.files = loadedFiles
        console.log('passFiles')
      }
    }
  }
</script>

<style>
  #app, body, html {
    margin: 0;
    height: 100%;
    width: 100%;
  }

  div {
    display: inline-block;
  }

  h1 {
    color: white;
  }

  h2 {
    font-family: Sans-serif;
    color: #797979;
    margin: 0 10px;
  }

  #wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: nowrap;
  }

  #management-wrapper {
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #file-mangement {
    background: #f6f6f6;
    width: 100%;
    height: 30%;
    overflow: auto;
    border-bottom: 1px solid #797979;
    border-right: 1px solid #797979;
  }

  #time-series-management {
    background: #f6f6f6;
    width: 100%;
    height: 70%;
    border-top: 1px solid #797979;
    border-right: 1px solid #797979;
  }

  #plot-wrapper {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #plotly-width {
    background: #bb00ff;
    width: 100%;
    height: 50%;
  }

  #plotly-index {
    background: #02d65d;
    width: 100%;
    height: 50%;
  }
</style>
