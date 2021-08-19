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

<style>
  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
  }
</style>
