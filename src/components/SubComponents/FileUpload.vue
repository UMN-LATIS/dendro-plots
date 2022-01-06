<template>

  <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl, .ewr, .lwr, .raw" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload">
    <img src="../../assets/upload.png" />
  </label>

</template>

<script>
  import formatFileData from '../../modules/formatFileData.js'

  export default {
    inject: ['store'],
    data: function() {
      return {
        info: ['Accepts: comma-, tab-, space-demlimited, .rwl, .json',
               'Accepts multiple files with multiple series in upload sequence']
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
    position: absolute;
    margin-top: -16px;
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
    display: inline-block;
  }
</style>
