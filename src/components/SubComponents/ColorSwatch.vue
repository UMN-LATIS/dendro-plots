<template>
  <input type="color" class="color-input" :value="colorValue" @change="onChange">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    computed: {
      colorValue: function() {
        let states = (this.id > 99 && this.id < 9999) ? this.store.cache.states : this.store.states.current
        let set = states.find(o => o.id == this.id)
        if (set) {
          return set.color
        }
        return '#FF0000'
      }
    },
    methods: {
      onChange: function(e) {
        this.store.methods.newCurrent(e.target.value, this.id, 'color')
      }
    },
  }
</script>

<style scoped>
  input[type="color"] {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    margin-top: 2px;
    margin-bottom: 2px;
    box-sizing: border-box;
    cursor: pointer;
    position: fixed;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
    border: 1px solid black;
    border-radius: 5px;
    padding: 0;
    margin: 0;
  }

  input[type="color"]::-moz-color-swatch {
    border: 1px solid black;
    border-radius: 5px;
    padding: 0;
    margin: 0;
    border-radius: 5px;
  }
</style>
