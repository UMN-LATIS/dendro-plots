<template>
  <input type="checkbox" :checked="isChecked" @change="onToggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'toggleProp'],
    computed: {
      isChecked: function() {
        if (this.id === "null") {
          return false;
        }

        if (this.id === "spag") {
          return this.store.cache.spagActive
        }

        if (this.id === this.store.cache.allID) {
          return this.store.methods.checkAll(this.toggleProp)
        } else {
          let states = (this.store.cache.medianIDs.includes(this.id)) ? this.store.cache.states : this.store.states.current
          let set = states.find(o => o.id == this.id)
          if (set) {
            return set[this.toggleProp]
          }
        }
        return false
      },
    },
    methods: {
      onToggle: function(e) {
        if (this.id === "null") {
          return
        }

        if (this.id === "spag") {
          this.store.methods.spagAction(e.target.checked)
          return
        }

        if (this.id === this.store.cache.allID) {
          this.store.methods.allAction(this.toggleProp, e.target.checked)
        } else if (this.store.cache.medianIDs.includes(this.id)) {
          this.store.methods.updateCache('states', this.id, this.toggleProp, e.target.checked)
        } else {
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
