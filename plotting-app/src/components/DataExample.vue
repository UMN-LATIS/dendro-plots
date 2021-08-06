<template>
  <div>
    <p> Timeseries </p>
    <input type="checkbox" disabled v-for="id in hoverTextID" :key="id" :id="id">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hoverTextID: ['color', 'widthPtToggle', 'widthSplineToggle', 'indexPtToggle', 'indexSplineToggle'],
      }
    },
  }
</script>

<style scoped>
  div {
    margin: 0;
    margin-left: 10px;
    display: inline;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    height: 18px;
    position: absolute;
    display: inline;
    margin: 0;
    margin-top: 2px;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 2px solid #797979;
    border-radius: 5px;
    margin-left: 10px;
    margin-right: 5px;
    box-sizing: border-box;
  }

  #color {
    background: black;
    margin-right: 0;
    margin-left: 105px;
  }
</style>
