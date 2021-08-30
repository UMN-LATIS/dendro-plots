<template>
  <div id="info">
    <Info :info="info"
          :width="20"
          :height="20"
    />
  </div>

  <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload"> Upload Files </label>
</template>

<script>
  import Info from './SubComponents/Info.vue'

  import formatFileData from '../modules/formatFileData.js'

  export default {
    inject: ['store'],
    components: { Info },
    data() {
      return {
        info: ['Accepts: comma-, tab-, space-demlimited, .rwl, .json.',
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
    background-color: black;
    color: white;
    padding: 4px 14px;
    font-family: sans-serif;
    font-size: 14px;
    font-weight: bold;
    border-radius: 4px;
    cursor: pointer;
    margin: 0;
    display: inline-block;
    margin-left: 22px;
  }

  label:hover {
    background-color: #797979;
    color: white;
  }

  #info {
    width: 20px;
    height: 20px;
    margin-top: 1px;
    position: absolute;
  }

</style>
