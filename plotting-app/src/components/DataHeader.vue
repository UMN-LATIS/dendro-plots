<template>
  <div v-if="store.cache.loadSequence.length">
    <div id="info">
      <Info :info="info"
            :width="20"
            :height="20"
      />
    </div>

    <p> Data </p>

    <div id="sort">
      <Sort />
    </div>

    <div id="undo-redo-buttons">
      <UndoRedoButtons />
    </div>
  </div>
</template>

<script>
  import Info from './SubComponents/Info.vue'
  import Sort from './SubComponents/Sort.vue'
  import UndoRedoButtons from './SubComponents/UndoRedoButtons.vue'

  export default {
    inject: ['store'],
    components: { Info, Sort, UndoRedoButtons },
    data() {
      return {
        info: ['Click to show/hide options.']
      }
    },
  }
</script>

<style scoped>
  div {
    margin: 0;
    display: inline;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: black;
    height: 18px;
    display: inline;
    margin: 0;
    margin-left: 22px;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 6px;
    cursor: pointer;
  }

  .info-icons {
    cursor: help;
  }

  .dropdown, .show:hover {
    cursor: normal;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
  }

  .dropdown-content {
    display: none;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -16px;
    margin-top: 22px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .first {
    margin-left: 5px;
  }

  #info {
    width: 20px;
    height: 20px;
    position: absolute;
  }

  #sort {
    margin-left: 6px;
  }

</style>
