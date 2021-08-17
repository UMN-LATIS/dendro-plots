<template>
  <input type="color" class="color-input" :value="value" @change="change">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    computed: {
      value: function () {
        for (const obj of this.store.state.currentData) {
          if (obj.id == this.id && obj.color) {
            return obj.color
          }
        }
      },
    },
    methods: {
      change(e) {
        this.store.methods.newCurrent(this.id, 'color', e.target.value)
      }
    },
  }
</script>
