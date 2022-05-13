<!--
  Purpose:
    Creates icon which when clicked performs a given action.

  Props:
    imageName:
      File name (without extension) of image to display.
    callback:
      Function to perform desired action when icon clicked.

  Computed:
    srcPath:
      Returns image file directory path. Function require() needed since the
      directory path is concatenated strings.

  Methods:
    onClick:
      Calls given function to perform action.
-->

<template>
  <img :src="srcPath"
       @click="onClick">
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
