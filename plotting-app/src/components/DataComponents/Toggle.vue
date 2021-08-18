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
  p {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 14px;
    color: #797979;
    display: inline;
  }

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
  }

  input[type="checkbox"]:checked {
    background: #797979;
  }
</style>
