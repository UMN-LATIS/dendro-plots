<template>
  <div class="dropdown">
    <img :src="srcPath"
         @click="onClick"
    >
    <div class="dropdown-content">
      <p v-for="blurb in info" :key="blurb"> {{ blurb }} </p>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: {
      info: Array,
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
    width: 20px;
    height: 20px;
    border: none;
    display: inline-block;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s;
    transition-delay: 1s;
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
    visibility: visible;
    opacity: 1;
  }
</style>
