<template>
  <div>
    <p :title="name + ' from ' + file"> {{ name }} </p>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['name', 'file'],
  }
</script>

<style scoped>
  div {
    width: 96px;
    height: 18px;
    display: inline;
  }

  p {
    display: inline-block;
    width: 94px;
    height: 16px;
    margin: 1px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: Sans-serif;
    font-weight: normal;
    font-size: 14px;
    color: black;
  }
</style>
