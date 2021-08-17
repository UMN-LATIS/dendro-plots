<template>
  <input type="color" class="color-input" :value="color" @change="change">
</template>

<script>
  export default {
    inject: ['store'],
    props: ['name', 'color'],
    emits: ['colorchange'],
    methods: {
      change(e) {
        this.$emit('colorchange', { name: this.name, color: e.target.value})
      }
    },
  }
</script>
