<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <div id="file-mangement">
        <FileManager />
      </div>
      <div id="undo-redo-buttons">
        <UndoRedoButtons />
      </div>
      <DataHeader id="data-header"/>
      <div id="time-series-management">
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
  import UndoRedoButtons from './components/UndoRedoButtons.vue'
  import DataManager from './components/DataManager.vue'
  import DataHeader from './components/DataHeader.vue'

  import store from './modules/store.js'

  export default {
    name: 'App',
    provide: { store },
    components: { FileManager, UndoRedoButtons, DataManager, DataHeader },
    data() {
      return {
      }
    },
  }
</script>

<style scoped>
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
    width: calc(100% - 10px);
    height: 100%;
    display: flex;
    margin-left: 10px;
    flex-flow: nowrap;
  }

  #management-wrapper {
    width: 350px;
    min-width: 350px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  #file-mangement {
    width: 100%;
    height: 32px;
    min-height: 32px;
    overflow: auto;
  }

  #undo-redo-buttons {
    margin-left: 26px;
    height: 26px;
  }

  #data-header {
  }

  #time-series-management {
    width: calc(100% - 10px);
    height: 100%;
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
