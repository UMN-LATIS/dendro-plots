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
        let selectedVal = this.store.states.current.find(o => o.id == this.id)[this.dropdownProp]
        return (selectedVal == this.value) ? true : false
      }
    },
  }
</script>
