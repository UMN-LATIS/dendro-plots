<template>
  <h2> File Management: </h2>
  <p style="font-size: 12px">
    Must be .JSON, .CSV, .RWL, tab delimited, or space delimited. Non .JSON files must include a header
    of their given format.
  </p>

  <input type="file" id="file-upload" accept=".json, .txt, .csv, .rwl" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload"> Upload Files </label>

  <div style="display: block;">
    <select ref="fileSelect">
      <option hidden :selected="!showDefault" :disabled="showDefault"> {{ defaultText }} </option>
      <option v-for="(name, index) in fileNames" :key="name" :value="name"> {{ index + 1 }}: {{ name }} </option>
    </select>
    <button type="button" id="file-delete" @click="removeFile">Remove File</button>
  </div>
  <div style="display: block;">
    <button type="button" id="load-files" @click="emitToParent">Load Files</button>
  </div>
</template>

<script>
  import formatFiles from '../composables/formatFiles.js'

  export default {
    emits: ['fileLoad'],
    data() {
      return {
        files: [],
        fileNames: [],
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
      },
      removeFile() {
        let fileIndex = this.fileNames.indexOf(this.$refs.fileSelect.value)
        if (fileIndex >= 0) {
          this.files.splice(fileIndex, 1)
          this.fileNames.splice(fileIndex, 1)
        }
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
    font-family: Sans-serif;
    color: #797979;
    margin: 0 10px;
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
    background-color: #f6f6f6;
    color: #797979;
    border: 1px solid #797979;
  }

  label:hover {
    padding: 4px 87px;
  }

  #load-files {
    margin-bottom: 10px;
  }

</style>
