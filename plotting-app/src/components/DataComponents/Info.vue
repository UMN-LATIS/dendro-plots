<template>
  <div class="dropdown"
       :style="{ width: width + 'px', height: + 'px' }"
  >
    <img src="../../assets/info-icon.png"
         :style="{ width: width + 'px', height: + 'px' }"
    >
    <div class="dropdown-content">
      <p v-for="blurb in info" :key="blurb"> {{ blurb }} </p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['info', 'width', 'height'],
  }
</script>

<style scoped>
  img {
    cursor: help;
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
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    display: none;
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
