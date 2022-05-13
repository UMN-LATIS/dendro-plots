<!--
  Purpose:
    Creates two icons for undoing and redoing certain changes performed by other
    components in the table of contents.

  Props:

  Computed:

  Methods:
-->

<template>
  <img src="../../assets/undo-button.png" class="hide"
       :class="{ show: store.states.past.length }"
       @click="store.methods.undo()">
  <img src="../../assets/redo-button.png" class="hide"
       :class="{ show: store.states.future.length }"
       @click="store.methods.redo()">
</template>

<script>
  export default {
    inject: ['store'],
  }
</script>

<style scoped>
  img {
    width: 18px;
    height: 14px;
    margin: 0;
    cursor: pointer;
    margin-left: 4px;
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
