<template>
  <input type="checkbox" :checked="isChecked" @change="onToggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'toggleProp'],
    computed: {
      isChecked: function() {
        if (this.id === this.store.cache.allID) {
          return this.store.methods.checkAll(this.toggleProp)
        } else {
          let set = this.store.states.current.find(o => o.id == this.id)
          if (set) {
            return set[this.toggleProp]
          }
        }
        return false
      },
    },
    methods: {
      onToggle: function(e) {
        if (this.id === this.store.cache.allID) {
          // all set
          this.store.methods.allAction(this.toggleProp, e.target.checked)
        } else {
          // base core or uploaded sets
          this.store.methods.newCurrent(e.target.checked, this.id, this.toggleProp)
        }
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
    border: 1px solid black;
    border-radius: 5px;
    margin: 2px;
    box-sizing: border-box;
    cursor: pointer;
    display: inline-block;
  }

  input[type="checkbox"]:checked {
    background: #797979;
  }
</style>
