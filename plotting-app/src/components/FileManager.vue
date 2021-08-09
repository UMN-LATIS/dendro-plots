<template>
  <div id="info-div">
    <img src="../assets/info-icon.png" id="info">
    <span id="info-content"> {{ fileInfo }} </span>
  </div>
  <h2> File Management: </h2>

  <br>

  <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload"> Upload Files </label>
</template>

<script>
  import formatFileData from '../composables/formatFileData.js'

  export default {
    emits: ['fileLoad'],
    data() {
      return {
        files: [],
        fileInfo: "blah blah blah blah blah blah blah blah blah blah blah blah"
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
  h2 {
    display: inline-block;
    font-family: Sans-serif;
    color: #797979;
    margin: 0;
    margin-bottom: 10px;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    margin: 0 10px 10px 10px;
  }

  label {
    background-color: #797979;
    color: white;
    padding: 6px 120px;
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

  #info {
    display: inline;
    width: 16px;
    height: 16px;
    margin: 0;
  }

  #info-div {
    display: inline;
    margin-right: 10px;
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
    margin-top: 28px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  #info-div:hover #info-content {
    display: inline;
  }


</style>
