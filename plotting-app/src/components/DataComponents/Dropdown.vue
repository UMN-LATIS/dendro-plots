<template>
  <div class="dropdown">
    <input type="checkbox" disabled :checked="activeBool" @change="change">
    <div class="dropdown-content">
      <DropdownOptions v-for="freq in frequencies" :key="freq"
                       :id="id"
                       :freq="freq"
                       :storedFreq="storedFreq"
                       :freqProperty="freqProperty"
                       :activeBool="activeBool"
                       :activeProperty="activeProperty"
      />
    </div>
  </div>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'storedFreq', 'freqProperty', 'activeBool', 'activeProperty'],
    components: { DropdownOptions },
    data() {
      return {
        frequencies: [20, 30, 50, 100, 200],
      }
    },
  }
</script>

<style scoped>
  .dropdown {
    cursor: pointer;
    position: relative;
    display: inline-block;
    margin: 0;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    margin-left: 10px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 0;
    z-index: 999999;
  }
</style>
