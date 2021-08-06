<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <div id="file-mangement">
        <FileManager @fileLoad="passFileData" />
      </div>
      <h2> Table of Contents: </h2>
      <DataExample />
      <div id="time-series-management">
        <DataManager :formattedFileData="formattedFileData" />
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
  import FileManager from './components/FileManager.vue'
  import DataManager from './components/DataManager.vue'
  import DataExample from './components/DataExample.vue'

  export default {
    name: 'App',
    components: { FileManager, DataManager, DataExample },
    data() {
      return {
        formattedFileData: null,
      }
    },
    methods: {
      passFileData(data) {
        this.formattedFileData = data.slice()
      }
    }
  }
</script>

<style>
  #app, body, html {
    margin: 0;
    height: 100%;
    width: 100%;
    background: #f6f6f6;
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
    width: 300px;
    min-width: 300px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #file-mangement {
    width: 100%;
    height: 85px;
    min-height: 85px;
    overflow: auto;
    border-bottom: 2px solid #797979;
  }

  #time-series-management {
    width: 100%;
    height: calc(100%-85px);
    overflow-y: auto;
    overflow-x: hidden;
  }

  #plot-wrapper {
    width: calc(100% - 290px);
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
