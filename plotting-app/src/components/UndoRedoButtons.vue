<template>
  <img src="../assets/undo-button.png" class="hide"
       :class="{ show: store.states.pastStates.length }"
       @click="store.methods.undo()">
  <img src="../assets/redo-button.png" class="hide"
       :class="{ show: store.states.futureStates.length }"
       @click="store.methods.redo()">
</template>

<script>
  export default {
    inject: ['store'],
  }
</script>

<style scoped>
  img {
    width: 24px;
    height: 20px;
    margin: 0;
    margin-left: 12px;
    cursor: pointer;
  }

  .show {
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }
</style>
