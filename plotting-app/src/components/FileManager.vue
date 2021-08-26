<template>
  <div id="info-text">
    <Info :info="fileInfo"
          :width="370" />
  </div>

  <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload"> Upload Files </label>
</template>

<script>
  import Info from './DataComponents/Info.vue'

  import formatFileData from '../modules/formatFileData.js'

  export default {
    inject: ['store'],
    components: { Info },
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
  input {
    margin: 0;
    padding: 0;
  }

  label {
    background-color: #797979;
    color: white;
    padding: 4px;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
    display: inline-block;
    margin-left: 25px;
  }

  label:hover {
    background-color: black;
    color: white;
  }

  #info-text {
    width: 20px;
    height: 20px;
    margin-top: 1px;
    position: absolute;
  }

</style>
