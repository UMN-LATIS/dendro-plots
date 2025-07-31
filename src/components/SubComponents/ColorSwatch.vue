<!--
  Purpose:
    Creates HTML color input which dictates color of data in plot.

  Props:
    id:
      ID of dataset. Allows for getting and setting of dataset colors.

  Computed:
    colorValue:
      Returns hex code of a given dataset. Hex code found by searching directory
      defined by ID. If no dataset found, black hex code returned.

  Methods:
    onChange:
      Saves new user selected color to correct save spot in store.js.
      Save location based on given ID.
-->

<template>
  <input type="color"
         class="color-input"
         :value="colorValue"
         @change="onChange">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    computed: {
      colorValue: function() {
        // ID dictates where to search for information. IDs within [99, 9999]
        // are found in undo/redo save states (store.states.current) while
        // IDs out of that bound (medians and base datasets from DE) are found
        // in cache save states (store.cache.states).
        let states = (this.id > 99 && this.id < 9999) ? this.store.cache.states : this.store.states.current
        let set = states.find(o => o.id == this.id)
        if (set) {
          return set.color
        }
        return '#000000'
      }
    },
    methods: {
      onChange: function(e) {
        // ID reponsible for how new color saved.
        // 3 possibilities:
        //  1) ID of all data -> perform color change on all datasets.
        //  2) ID of median -> perform color change on median in cache.states.
        //  3) Other -> perform color change on dataset in state.current.
        if (this.id === this.store.cache.allID) {
          this.store.methods.allAction('color', e.target.value)
        } else if (this.store.cache.medianIDs.includes(this.id)) {
          this.store.methods.updateCache('states', this.id, 'color', e.target.value)
        } else {
          this.store.methods.newCurrent(e.target.value, this.id, 'color')
        }
      }
    },
  }
</script>

<style scoped>
  input[type="color"] {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    padding: 0;
    border: none;
    margin: 2px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
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