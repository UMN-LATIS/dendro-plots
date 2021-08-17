<template>
  <input type="checkbox" :checked="toggleChecked" :disabled="disabled" @change="toggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'toggleProperty', 'toggleChecked', 'disableValue'],
    computed: {
      disabled: function() {
        if (this.disableValue > 0) {
          return false
        }
        return true
      }
    },
    methods: {
      toggle(e) {
        this.store.methods.newCurrent(this.id, this.toggleProperty, e.target.checked)
      },
    }
  }
</script>
