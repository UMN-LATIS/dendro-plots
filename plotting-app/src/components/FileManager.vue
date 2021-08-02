<template>
  <h2> File Management: </h2>
  <p> File format instructions... </p>

  <input type="file" id="file-upload" multiple hidden ref="fileInput" @change="uploadFiles">
  <label for="file-upload"> Upload File </label>

  <div v-if="fileNames.length">
    <select ref="fileSelect">
      <option selected disabled hidden> View Files </option>
      <option v-for="name in fileNames" :key="name" :value="name"> {{ name }} </option>
    </select>
    <button type="button" id="file-delete" @click="removeFile">Remove File</button>
  </div>
  <div v-if="fileNames.length">
    <button type="button" id="load-files" @click="$emit('fileLoad', files)">Load Files</button>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: [],
        fileNames: [],
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
        this.files.splice(fileIndex, 1)
        this.fileNames.splice(fileIndex, 1)
      }
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
    margin: 0 0 10px 10px;
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
    margin: 10px 10px 0 10px;
  }

  button {
    border: 1px solid #797979;
  }

  label {
    padding-left: 91px;
    padding-right: 92px;
  }

  label:hover, button:hover {
    background-color: #f6f6f6;
    color: #797979;
    border: 1px solid #797979;
  }

</style>
