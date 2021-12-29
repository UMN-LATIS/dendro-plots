<template>
  <div class="dropdown"
       :style="{ 'width': isWidth + 'px' }"
  >

    <component :is="isComponent" v-bind="isData" />

    <div class="dropdown-content"
         :style="{ 'margin-left': isMarginLeft + 'px' }"
    >
      <p class="info"> {{ info }} </p>
    </div>

  </div>
</template>

<script>
  import Toggle from './Toggle.vue'
  import Dropdown from './Dropdown.vue'
  import ColorSwatch from './ColorSwatch.vue'

  export default {
    inject: ['store'],
    props: ['isMarginLeft', 'isWidth', 'isData', 'isComponent', 'info'],
    components: { Toggle, Dropdown, ColorSwatch },
  }
</script>

<style scoped>
  .info {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    width: max-content;
  }

  .dropdown {
    height: 20px;
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: 20px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
    display: inline;
  }
</style>
