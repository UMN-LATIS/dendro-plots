<!--
  Purpose:
    Creates text block. To be used in HoverWrapper component. 

  Props:

  Computed:

  Methods:
-->

<template>
  <p class="header"> {{ text }} </p>
</template>

<script>
  export default {
    props: ['text']
  }
</script>

<style scoped>
  .header {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: black;
    height: 18px;
    display: inline;
    margin: 0;
    margin-bottom: -20px;
  }
</style>
