<template>
  <input type="color" class="color-input" :value="value" @change="change">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    computed: {
      value: function () {
        const obj = this.store.states.currentData.find(o => o.id == this.id)
        if (obj && obj.pointColor) {
          return obj.pointColor
        }
      },
    },
    methods: {
      change: function(e) {
        this.store.methods.newCurrent(e.target.value, this.id, 'pointColor')
      }
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
</style>
