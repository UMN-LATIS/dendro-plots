<template>
  <input type="checkbox" :checked="toggleChecked" :disabled="toggleDisable" @change="toggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'activeProperty', 'toggleChecked', 'toggleDisable'],
    methods: {
      toggle: function(e) {
        this.store.methods.newCurrent(e.target.checked, this.id, this.activeProperty)
      },
    }
  }
</script>

<style>
   input[type="checkbox"] {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    padding: 0;
    border: 2px solid #797979;
    border-radius: 5px;
    margin: 2px 6px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
  }

  input[type="checkbox"]:checked {
    background: #bdbdbd;
  }
</style>
