<template>
  <div class="dropdown"
       :style="{ 'width': isWidth + 'px' }"
  >

    <component :is="isComponent" v-bind="isData" />

    <div class="dropdown-content"
         :style="{ 'margin-left': isMarginLeft + 'px', 'margin-top': isMarginTop + 'px' }"
    >
      <p class="info"
         v-for="blurb in info"
         :key="blurb"> {{ blurb }}
      </p>
    </div>

  </div>
</template>

<script>
  import Toggle from './Toggle.vue'
  import Dropdown from './Dropdown.vue'
  import ColorSwatch from './ColorSwatch.vue'
  import FileUpload from './FileUpload.vue'
  import Text from './Text.vue'
  import ClickIcon from './ClickIcon.vue'

  export default {
    inject: ['store'],
    props: ['isMarginLeft', 'isMarginTop', 'isWidth', 'isData', 'isComponent', 'info'],
    components: { Toggle, Dropdown, ColorSwatch, FileUpload, Text, ClickIcon },
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

  .dropdown-content:hover {
    display: none !important;
  }
</style>
