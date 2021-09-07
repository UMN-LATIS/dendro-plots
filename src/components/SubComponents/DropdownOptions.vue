<template>
  <option :value="value"
          :selected="isSelected"
  >
    {{ name }}
  </option>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'name', 'value', 'dropdownProp'],
    computed: {
      isSelected: function() {
        let selectedVal
        if (this.id === this.store.cache.allID) {
          // all set
          selectedVal = this.store.methods.checkAll(this.dropdownProp)
        } else {
          // base core and uploaded sets
          let set = this.store.states.current.find(o => o.id == this.id)
          selectedVal = (set) ? set[this.dropdownProp] : null
        }
        return (selectedVal == this.value) ? true : false
      }
    },
  }
</script>
