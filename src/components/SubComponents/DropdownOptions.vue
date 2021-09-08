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
          selectedVal = this.store.methods.checkAll(this.dropdownProp)
        } else {
          let states = (this.id === this.store.cache.medianID) ? this.store.cache.states : this.store.states.current
          let set = states.find(o => o.id == this.id)
          selectedVal = (set) ? set[this.dropdownProp] : null
        }
        return (selectedVal == this.value) ? true : false
      }
    },
  }
</script>
