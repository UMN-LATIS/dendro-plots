<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <div id="file-mangement">
        <FileManager />
      </div>
      <div id="time-series-management">
        <h1> Time Series Management</h1>
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
import $ from 'jquery'
import 'jquery-ui'
import simpleSmoothingSpline from 'simple-smoothing-spline'
import Plotly from 'plotly.js-dist'

import FileManager from './components/FileManager.vue'

export default {
  name: 'App',
  components: { FileManager },
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
  }

  #time-series-management {
    background: #0040ff;
    width: 100%;
    height: 70%;
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
