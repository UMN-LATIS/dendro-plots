<!--
  Purpose:
    Creates toggle button to activate or deactivate given dataset properties.

  Props:
    id:
      ID of dataset. Allows for getting and setting of dataset properties.
    toggleProp:
      String of property key to be modifed.

  Computed:
    isChecked:
      

  Methods:
    onToggle:

-->

<template>
  <input type="checkbox"
         :checked="isChecked"
         @change="onToggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['ids', 'toggleProp'],
    computed: {
      isChecked: function() {
        if (this.ids[0] === this.store.cache.allID) {
          return this.store.methods.checkAll(this.toggleProp)
        } else {
          let states = (this.store.cache.medianIDs.includes(this.ids[0])) ? this.store.cache.states : this.store.states.current
          let set = states.find(o => o.id == this.ids[0])
          if (set) {
            return set[this.toggleProp]
          }
        }
        return false
      },
    },
    methods: {
      onToggle: function(e) {
        for (let id of this.ids) {
          if (id === this.store.cache.allID) {
            this.store.methods.allAction(this.toggleProp, e.target.checked)
          } else if (this.store.cache.medianIDs.includes(id)) {
            this.store.methods.updateCache('states', id, this.toggleProp, e.target.checked)
          } else {
            this.store.methods.newCurrent(e.target.checked, id, this.toggleProp)
          }
        }
        // if (this.id === this.store.cache.allID) {
        //   this.store.methods.allAction(this.toggleProp, e.target.checked)
        // } else if (this.store.cache.medianIDs.includes(this.id)) {
        //   this.store.methods.updateCache('states', this.id, this.toggleProp, e.target.checked)
        // } else {
        //   this.store.methods.newCurrent(e.target.checked, this.id, this.toggleProp)
        // }
      },
    }
  }
</script>

<style>
   input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
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