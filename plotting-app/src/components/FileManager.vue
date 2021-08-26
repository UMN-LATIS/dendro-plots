<template>
  <div id="file-div">
    <div id="info-div">
      <img src="../assets/info-icon.png" id="info">
      <div id="info-content">
        <span v-for="info in fileInfo" :key="info"> {{ info }} <br> </span>
      </div>
    </div>

    <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
    <label for="file-upload"> Upload Files </label>
  </div>

  <div id="state-div">
    <img src="../assets/undo-button.png" class="undo-redo-button hide"
         :class="{ show: store.states.pastStates.length }"
         @click="store.methods.undo()">
    <img src="../assets/redo-button.png" class="undo-redo-button hide"
         :class="{ show: store.states.futureStates.length }"
         @click="store.methods.redo()">
 </div>
</template>

<script>
  import formatFileData from '../modules/formatFileData.js'

  export default {
    inject: ['store'],
    data() {
      return {
        fileInfo: ['Accepts: comma-, tab-, space-demlimited, .rwl, .json.',
                   'Accepts multiple files with multiple series in upload sequence.',
                   'Click to download example datasets with correctly formatted headers.']
      }
    },
    methods: {
      async uploadFiles() {
        let data = await formatFileData(this.$refs.fileInput.files)
        this.store.methods.loadData(data)
        this.$refs.fileInput.value = null
      },
    }
  }
</script>

<style scoped>
  p {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    margin: 0 10px 10px 10px;
  }

  input {
    margin: 0;
    padding: 0;
  }

  label {
    background-color: #797979;
    color: white;
    padding: 6px;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
    margin-left: 30px;
  }

  label:hover {
    background-color: black;
    color: white;
  }

  img {
    cursor: help;
  }

  .undo-redo-button {
    width: 24px;
    height: 24px;
    margin: 0;
    margin-left: 10px;
  }

  .show {
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }

  #file-div {
    margin-top: 5px;
  }

  #state-div {
    display: block;
    margin-top: 10px;
    margin-left: 36px;
  }

  #info-div {
    cursor: help;
    position: absolute;
    margin: 0;
  }

  #info {
    display: inline;
    width: 20px;
    height: 20px;
  }

  #info-content {
    display: none;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -10px;
    margin-top: 20px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
    cursor: help;
  }

  #info-div:hover #info-content {
    display: inline;
    width: 380px;
    cursor: help;
  }

</style>
