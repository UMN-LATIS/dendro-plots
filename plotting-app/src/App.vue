<template>
  <div id="management-wrapper">
    <div id="file-mangement">
      <h1> File Management </h1>
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
</template>

<script>
import $ from 'jquery'
import 'jquery-ui'
import simpleSmoothingSpline from 'simple-smoothing-spline'
import Plotly from 'plotly.js-dist'

export default {
  name: 'App',
  components: {},
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

  #management-wrapper {
    width: 30%;
    height: 100%;
  }

  #file-mangement {
    background: #ff0000;
    width: 100%;
    height: 50%;
  }

  #time-series-management {
    background: #0040ff;
    width: 100%;
    height: 50%;
  }

  #plot-wrapper {
    width: 70%;
    height: 100%;
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
