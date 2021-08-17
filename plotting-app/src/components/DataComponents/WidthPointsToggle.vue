<template>
  <input type="checkbox" class="toggle-width-pts" :checked="checked" @change="toggle">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['name'],
    emits: ['widthtoggle'],
    computed: {
      checked: function() {
        for (const obj of this.store.state.currentShownData) {
          //// TODO: spline check
          if (obj.name == this.name) {
            return true
          }
        }

        return false
      }
    },
    methods: {
      toggle(e) {
        this.$emit('widthtoggle', { name: this.name, toggleOn: e.target.checked })
      },
    }
  }
</script>
