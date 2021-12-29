<template>
  <div class="dropdown">
    <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl, .ewr, .lwr, .raw" multiple hidden ref="fileInput" @change="uploadFiles">
    <label for="file-upload">
      <img src="../assets/upload.png" />
    </label>
    <div class="dropdown-content">
      <p class="info"
         v-for="blurb in info"
         :key="blurb"> {{ blurb }}
      </p>
    </div>
  </div>
</template>

<script>
  import formatFileData from '../modules/formatFileData.js'

  export default {
    inject: ['store'],
    data: function() {
      return {
        info: ['Accepts: comma-, tab-, space-demlimited, .rwl, .json.',
               'Accepts multiple files with multiple series in upload sequence.']
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
  img {
    width: 20px;
    height: 20px;
  }

  input {
    margin: 0;
    padding: 0;
  }

  label {
    padding: 0;
    cursor: pointer;
    margin: 0;
    margin-left: 2px;
    display: inline-block;
  }

  .info {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    width: max-content;
  }

  .dropdown {
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: 20px;
    margin-left: -10px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
    display: inline;
  }

</style>
