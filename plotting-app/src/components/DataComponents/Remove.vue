<template>
  <div>
    <img src="../../assets/delete-button.png" @click="click">
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    methods: {
      click: function() {
        this.store.methods.removeCurrent(this.id)
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline;
  }

  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0 4px;
  }
</style>
