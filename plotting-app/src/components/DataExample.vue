<template>
  <div>
    <p> Timeseries </p>
    <div class="dropdown" v-for="(id, index) in imgID" :key="id">
      <img src="../assets/info-icon.png" :id="id">
      <div class="dropdown-content">
        <span> {{ hoverText[index] }} </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        imgID: ['first-img', '', '', '', ''],
        hoverText: ['hovertext hovertext hovertext hovertext hovertext',
                    'hovertext hovertext hovertext hovertext hovertext',
                    'hovertext hovertext hovertext hovertext hovertext',
                    'hovertext hovertext hovertext hovertext hovertext',
                    'hovertext hovertext hovertext hovertext hovertext'],

      }
    },
  }
</script>

<style scoped>
  div {
    margin: 0;
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
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 8px;
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
