<!--
  Purpose:
    Creates HTML dropdown menu for selecting given dataset properties.

  Props:
    id:
      ID of dataset. Allows for getting and setting of dataset properties.
    options:
      Array of options (strings) user may select from for a given property.
    optionModifer:
      Additional string to be concatenated onto the front of all options.
    mainProp:
      Property to get or set by the dropdown value. Property to be modified.
    actions:
      Array of strings which represents dataset property keys. Allows chaining
      of actions to occer from a single selection.
    disableProp:
      Property which disables the dropdown when it is false.

  Computed:
    isDisabled:
      Returns if dropdown is disabled based on the given disable property.

  Methods:
    onChange:
    Saves new user selected property to correct save spot in store.js.
    Save location based on given ID.
-->

<template>
  <select @change="onChange">
    <DropdownOptions v-for="obj in options"
                     :key="obj.id"
                     :id="id"
                     :name="optionModifer + obj.name"
                     :value="obj.id"
                     :mainProp="mainProp"
                     :disabled="isDisabled"/>
  </select>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'options', 'optionModifer', 'mainProp', 'actions', 'disableProp'],
    components: { DropdownOptions },
    computed: {
      isDisabled: function() {
        if (!this.disableProp) {
          return this.disableProp
        }

        // ID dictates where to search for information. IDs within [99, 9999]
        // are found in undo/redo save states (store.states.current) while
        // IDs out of that bound (medians and base datasets from DE) are found
        // in cache save states (store.cache.states).
        if (this.id === this.store.cache.allID) {
          return !this.store.methods.checkAll(this.disableProp)
        } else {
          let states = (this.store.cache.medianIDs.includes(this.id)) ? this.store.cache.states : this.store.states.current
          let set = states.find(o => o.id == this.id)
          if (set) return !set[this.disableProp]
        }
      }
    },
    methods: {
      onChange: function(e) {
        // Dropdown returns string values. Need to save integers or booleans.
        let val = e.target.value
        let boolCheck = (val === 'false')
        if (boolCheck) {
          val = false
        } else if (parseInt(val)) {
          val = parseInt(val)
        }

        // ID reponsible for how new color saved.
        // 3 possibilities:
        //  1) ID of all data -> perform color change on all datasets.
        //  2) ID of median -> perform color change on median in cache.states.
        //  3) Other -> perform color change on dataset in state.current.
        for (let prop of this.actions) {
          if (this.id === this.store.cache.allID) {
            this.store.methods.allAction(prop, val)
          } else if (this.store.cache.medianIDs.includes(this.id)) {
            this.store.methods.updateCache('states', this.id, prop, val)
          } else {
            this.store.methods.newCurrent(val, this.id, prop)
          }
        }
      }
    },
  }
</script>

<style scoped>
  @-moz-document url-prefix() {
    select {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -ms-appearance: none;

    font-family: Sans-serif;
    font-weight: normal;
    font-size: 11px;
    color: black;
    height: 16px;
    border: 1px solid black;
    border-radius: 4px;
    padding-left: 4px;
    padding-right: 4px;
    position: relative;
    margin-top: 2px;
    margin-bottom: 2px;
    cursor: pointer;
    z-index: 0;
  }

  select::-ms-expand {
    display: none;
  }

</style>
