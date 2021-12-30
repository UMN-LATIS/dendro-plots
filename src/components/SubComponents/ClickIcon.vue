<template>
  <img :src="srcPath"
       @click="onClick"
  >
</template>

<script>
  export default {
    inject: ['store'],
    props: {
      imageName: String,
      callback: Function,
    },
    computed: {
      srcPath: function() {
        return require('../../assets/' + this.imageName + '.png')
      }
    },
    methods: {
      onClick: function() {
        if (this.callback) {
          this.callback()
        }
      }
    }
  }
</script>

<style scoped>
  img {
    width: 18px;
    height: 18px;
    margin-bottom: -2px;
    cursor: pointer;
  }
</style>
