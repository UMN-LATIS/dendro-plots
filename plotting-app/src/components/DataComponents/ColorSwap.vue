<template>
  <div>
    <img :src="swapPNG[swapIndex]" @click="click">
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'swapState', 'color'],
    data() {
      return {
        swapPNG: [require('../../assets/swap-color-a-icon.png'), require('../../assets/swap-color-b-icon.png')],
      }
    },
    computed: {
      swapIndex: function() {
        return (this.swapState) ? 0 : 1
      }
    },
    methods: {
      click: function() {
        let colorState = !this.swapState
        this.store.methods.newCurrent(colorState, this.id, 'colorState')
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
    margin: 0 6px;
  }
</style>
