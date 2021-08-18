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
    width: 105px;
    height: 18px;
  }

  p {
    display: inline-block;
    width: 100px;
    height: 16px;
    margin: 1px 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: Sans-serif;
    font-weight: normal;
    font-size: 14px;
    color: #797979;
  }
</style>
