<template>
  <div class="dropdown">
    <img src="../../assets/dendro.png">
    <div class="dropdown-content">
      <p>Data visualization tools</p>
      <p>developed for <a href="http://dendro.elevator.umn.edu/" target="_blank">DendroElevator</a></p>
      <p>at the <a href="http://umn.edu/" target="_blank">University of Minnesota</a></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['info', 'width', 'height'],
  }
</script>

<style scoped>
  a {
    color: #03b5fc;
  }

  img {
    cursor: help;
    display: inline;
    height: 38px;
    width: 16px;
  }

  p {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    width: max-content;
  }

  .dropdown {
    display: inline !important;
    border: none;
    height: 38px;
    width: 16px;
  }

  .dropdown-content {
    display: none;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -15px;
    margin-top: 38px;
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
