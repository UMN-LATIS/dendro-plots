<template>
  <div>
    <img src="../../assets/delete-button.png"
         @click="onClick"
    >
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    methods: {
      onClick: function() {
        if (this.id === this.store.cache.allID) {
          // all set
          this.store.methods.newCurrent([])
        } else {
          // base core or uploaded sets
          this.store.methods.removeCurrent(this.id)
        }
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
    margin: 0;
    margin-right: 5px;
  }
</style>
