<template>
  <div class="dropdown">
    <img src="../../assets/info-icon.png">
    <div class="dropdown-content"
         :style=" { width: width + 'px' } ">
      <span v-for="blurb in info" :key="blurb"> {{ blurb }} <br> </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['info', 'width'],
  }
</script>

<style scoped>
  img {
    width: 20px;
    height: 20px;
    cursor: help;
  }

  .dropdown {
    width: 20px;
    height: 20px;
    display: inline-block;
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
    margin-left: -10px;
    margin-top: 20px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
    cursor: help;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
  }
</style>
