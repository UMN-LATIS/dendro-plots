<template>
  <div>
    <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
    <label for="file-upload"> Upload Files </label>
    <div id="info-div">
      <img src="../assets/info-icon.png" id="info">
      <div id="info-content">
        <span v-for="info in fileInfo" :key="info"> {{ info }} <br> </span>
      </div>
    </div>
  </div>
</template>

<script>
  import formatFileData from '../modules/formatFileData.js'

  export default {
    emits: ['fileLoad'],
    data() {
      return {
        files: [],
        fileInfo: ['Accepts: comma-, tab-, space-demlimited, .rwl, .json.',
                   'Accepts multiple files with multiple series in upload sequence.',
                   'Click to download example datasets with correctly formatted headers.']
      }
    },
    methods: {
      uploadFiles() {
        for (let file of this.$refs.fileInput.files) {
          this.files.push(file)
        }
        this.emitToParent()
        this.$refs.fileInput.value = null
      },
      async emitToParent() {
        let dataObjArray = await formatFileData(this.files)
        // format = [[[year, data name, ...], [1900, 1.5, ...], ...], [[year, data name, ...], [1900, 1.5, ...], ...], ...]
        this.$emit('fileLoad', dataObjArray)
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

  label {
    background-color: #797979;
    color: white;
    padding: 6px 100px;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
  }

  label:hover {
    background-color: black;
    color: white;
  }

  div {
    margin-top: 20px;
  }

  #info-div {
    position: absolute;
    margin-top: 2px;
    margin-left: 10px;
  }

  #info {
    display: inline;
    width: 16px;
    height: 16px;
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
  }

  #info-div:hover #info-content {
    display: inline;
    width: 380px;
  }


</style>
