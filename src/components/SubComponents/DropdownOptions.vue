<!--
  Purpose:
    Creates a single HTML option for dropdown created from Dropdown.vue.

  Props:
    id:
      ID of dataset. Allows for getting and setting of dataset properties.
    name:
      String shown to user when selecting options.
    value:
      Value of individual option. Determined by option id defined in Modal.vue.
    mainProp:
      Property to check in order to decide which option is selected thus shown
      to user.

  Computed:
    isSelected:
      Returns if option was previously selected by user. If its value is whats
      currently saved value in store.js.

  Methods:
-->

<template>
  <option :value="value"
          :selected="isSelected">
    {{ name }}
  </option>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'name', 'value', 'mainProp'],
    computed: {
      isSelected: function() {
        // ID dictates where to search for information. IDs within [99, 9999]
        // are found in undo/redo save states (store.states.current) while
        // IDs out of that bound (medians and base datasets from DE) are found
        // in cache save states (store.cache.states).
        let selectedVal
        if (this.id === this.store.cache.allID) {
          selectedVal = this.store.methods.checkAll(this.mainProp)
        } else {
          let states = (this.store.cache.medianIDs.includes(this.id)) ? this.store.cache.states : this.store.states.current
          let set = states.find(o => o.id == this.id)
          selectedVal = (set) ? set[this.mainProp] : null
        }
        return (selectedVal == this.value) ? true : false
      }
    },
  }
</script>

<style scoped>

  option {
    z-index: 0;
    position: relative;
  }

</style>
