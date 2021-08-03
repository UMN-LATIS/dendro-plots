<template>
  <h2> Table of Contents: </h2>
  <div class="individual-data-wrapper" v-if="showData" v-for="name in fileNames" :key="name">
    <div class="data-names">
      <p> {{ name }} </p>
    </div>
    <div class="data-options">
      <input type="color">
      <input type="checkbox">
      <input type="checkbox">
      <input type="checkbox">
      <input type="checkbox">
    </div>
  </div>
</template>

<script>
  import formatFileData from '../composables/formatFileData.js'

  export default {
    props: ['files'],
    data() {
      return {
          showData: false,
          fileNames: ['All Data', 'Median'],
      }
    },
    methods: {

    },
    mounted() {
      console.log('mounted')
      formatFileData(this.files)
      for (let file of this.files) {
        let formattedName = file.name.split('.')[0]
        this.fileNames.push(formattedName)
        this.showData = true
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
    display: inline;
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
  }

</style>
