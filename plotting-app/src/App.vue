<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <div id="file-mangement">
        <FileManager />
      </div>
      <DataHeader id="data-header"/>
      <div id="data-management">
        <DataManager />
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
  import DataHeader from './components/DataHeader.vue'

  import store from './modules/store.js'

  export default {
    name: 'App',
    provide: { store },
    components: { FileManager, DataManager, DataHeader },
  }
</script>

<style>
  #app, body, html {
    margin: 0;
    padding: 0;
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
    width: 140px;
    min-width: 140px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #file-mangement {
    width: inherit;
    height: 24px;
    min-height: 24px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  #data-management {
    width: inherit;
    height: 100%;
    overflow-y: visible;
    overflow-x: hidden;
  }

  #plot-wrapper {
    width: calc(100% - 140px);
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
