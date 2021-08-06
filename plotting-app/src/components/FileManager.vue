<template>
  <div id="info-div">
    <img src="../assets/info-icon.png" id="info">
    <span id="info-content"> {{ fileInfo }} </span>
  </div>
  <h2> File Management: </h2>

  <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload"> Upload Files </label>
</template>

<script>
  import formatFiles from '../composables/formatFiles.js'

  export default {
    emits: ['fileLoad'],
    data() {
      return {
        files: [],
        fileNames: [],
        fileInfo: "blah blah blah blah blah blah blah blah blah blah blah blah"
      }
    },
    computed: {
      showDefault: function () {
        return (this.fileNames.length) ? true : false
      },
      defaultText: function () {
        return (this.fileNames.length) ? 'View Files' : 'No Files'
      }
    },
    methods: {
      uploadFiles() {
        for (let file of this.$refs.fileInput.files) {
          if (this.fileNames.includes(file.name) == false) {
            this.files.push(file)
            this.fileNames.push(file.name)
          }
        }
        this.emitToParent()
      },
      async emitToParent() {
        let formattedFileData = await formatFiles(this.files)
        // format = [[[year, data name, ...], [1900, 1.5, ...], ...], [[year, data name, ...], [1900, 1.5, ...], ...], ...]
        this.$emit('fileLoad', formattedFileData)
      },
    }
  }
</script>

<style scoped>
  h2 {
    display: inline-block;
    font-family: Sans-serif;
    color: #797979;
    margin: 10px;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    margin: 0 10px 10px 10px;
  }

  label, select, button {
    background-color: #797979;
    color: white;
    width: 120px;
    padding: 4px 6px;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 10px 10px -5px 10px;
  }

  label {
    padding: 5px 88px;
  }

  button {
    border: 1px solid #797979;
  }

  label:hover, button:hover {
    background-color: black;
    color: white;
  }

  #load-files {
    margin-bottom: 10px;
  }

  #info {
    display: inline;
    width: 16px;
    height: 16px;
    margin: 10px -5px 0 10px;
  }

  #info-div {
    display: inline;
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
    margin-left: -5px;
    margin-top: 40px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  #info-div:hover #info-content {
    display: inline;
  }


</style>
