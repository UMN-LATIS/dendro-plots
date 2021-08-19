<template>
  <input type="checkbox" :checked="toggleChecked" :disabled="toggleDisable" @change="toggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'toggleProperty', 'toggleChecked', 'toggleDisable'],
    methods: {
      toggle(e) {
        this.store.methods.newCurrent(e.target.checked, this.id, this.toggleProperty)
      },
    }
  }
</script>

<style>
   input[type="checkbox"] {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 2px solid #797979;
    border-radius: 5px;
    margin: 0;
    margin-right: 16px;
    box-sizing: border-box;
    cursor: pointer;
  }

  input[type="checkbox"]:checked {
    background: #797979;
  }
</style>
