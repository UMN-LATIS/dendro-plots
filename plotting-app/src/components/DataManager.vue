<template>
  <h2> Table of Contents: </h2>
  <div class="individual-data-wrapper" v-if="files && files.length" v-for="name in fileNames" :key="name">
    <div class="data-names">
      <p> {{ name }} </p>
    </div>
    <div class="data-options">
      <input type="color" @change="colorChange">
      <input type="checkbox" @change="toggleWidthPoints">
      <input type="checkbox" @change="toggleWidthSpline">
      <input type="checkbox" @change="toggleIndexPoints">
      <input type="checkbox" @change="toggleIndexSpline">
    </div>
  </div>
  <p style="margin: 0px 10px;" v-else> No Data to Display </p>
</template>

<script>
  import formatFileData from '../composables/formatFileData.js'

  export default {
    props: ['files'],
    data() {
      return {
      }
    },
    computed: {
      fileNames: function () {
        let fileNamesArray = ['All Data', 'Median']
        for (let file of this.files) {
          let formattedName = file.name.split('.')[0]
          fileNamesArray.push(formattedName)
        }
        return fileNamesArray
      },
    },
    methods: {
      colorChange(e) {
        console.log(e.target.value)
      },
      toggleWidthPoints (e) {
        console.log(e.target.checked)
      },
      toggleWidthSpline (e) {
        console.log(e.target.checked)
      },
      toggleIndexPoints (e) {
        console.log(e.target.checked)
      },
      toggleIndexSpline (e) {
        console.log(e.target.checked)
      },
    },
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
    display: inline;
  }

  input[type="color"], input[type="checkbox"] {
    -webkit-appearance: none;
    width: 18px;
    height: 100%;
    padding: 0;
    border: 1px solid #797979;
    border-radius: 5px;
    margin: 0 10px;
    box-sizing: border-box;
  }

  input[type="checkbox"] {
    border: 2px solid #797979;
  }

  input[type="checkbox"]:checked {
    background: #b5b5b5;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
  	padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
  	border: 1px solid #797979;
    border-radius: 5px;
  }

  input[type="color"]::-moz-color-swatch {
    border: 1px solid #797979;
    border-radius: 5px;
  }

  .individual-data-wrapper {
    width: 100%;
    margin-left: 10px;
  }

  .data-names {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    width: calc(40% - 10px);
    height: 18px;
    margin-right: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .data-options {
    width: calc(60% - 10px);
    height: 18px;
  }

</style>
