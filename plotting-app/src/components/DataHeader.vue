<template>
  <div>
    <h2> Table of Contents: </h2>
    <p> Timeseries </p>
    <div class="dropdown" v-for="(id, index) in imgID" :key="id">
      <img src="../assets/info-icon.png" :id="id">
      <div class="dropdown-content">
        <span> {{ hoverText[index] }} </span>
      </div>
    </div>
    <img src="../assets/undo-button.png" class="hide" :class="{ show: store.states.pastData.length }" title="Undo" @click="store.methods.undo()">
    <img src="../assets/redo-button.png" class="hide" :class="{ show: store.states.futureData.length }" title="Redo" @click="store.methods.redo()">
  </div>
</template>

<script>
  // undo redo emit events, data manager handles them

  export default {
    inject: ['store'],
    data() {
      return {
        imgID: ['first-img', '', '', '', ''],
        hoverText: ['Show in width plot',
                    'Spline for detrending',
                    'Show in index plot',
                    'Spline for index plot',
                    'Change line color'],

      }
    },
  }
</script>

<style scoped>
  div {
    margin: 0;
    display: inline;
  }

  h2 {
    margin-left: 0;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #797979;
    height: 18px;
    position: absolute;
    display: inline;
    margin: 0;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 8px;
  }

  .show {
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .show:hover {
    cursor: pointer;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
  }

  .dropdown-content {
    display: none;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -16px;
    margin-top: 22px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  #first-img {
    margin-left: 105px;
  }

</style>
