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
        let set = this.store.states.current.find(o => o.id == this.id)
        let selectedVal = (set) ? set[this.dropdownProp] : null
        return (selectedVal == this.value) ? true : false
      }
    },
  }
</script>
