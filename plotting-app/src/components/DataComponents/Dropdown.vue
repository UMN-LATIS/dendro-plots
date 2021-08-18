<template>
  <div class="dropdown">
    <input type="checkbox" disabled :checked="isChecked" @change="change">
    <div class="dropdown-content">
      <DropdownOptions v-for="freq in frequencies" :key="freq"
                       :id="id"
                       :freq="freq"
                       :freqProperty="freqProperty"
                       :activeProperty="activeProperty"
      />
    </div>
  </div>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'activeProperty', 'freqProperty'],
    components: { DropdownOptions },
    data() {
      return {
        frequencies: [20, 30, 50, 100, 200],
      }
    },
    computed: {
      isChecked: function() {
        const obj = this.store.states.currentData.find(o => o.id == this.id)
        if (obj && obj[this.activeProperty]) {
          return true
        }
        return false
      },
    },
  }
</script>

<style scoped>
  input[type="color"] {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 1px solid #797979;
    border-radius: 5px;
    margin: 0;
    margin-right: 16px;
    box-sizing: border-box;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: 1px solid #797979;
    padding: 0;
    margin: 0;
    border-radius: 4px;
  }

  input[type="color"]::-moz-color-swatch {
    border: 1px solid #797979;
    padding: 0;
    margin: 0;
    border-radius: 4px;
  }

  .dropdown {
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
