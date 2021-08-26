<template>
  <div class="individual-wrapper"
       v-for="obj in store.states.currentStates"
       :key="obj.id"
  >
    <Name :name="obj.name"
          :file="obj.file"
    />
    <Remove :id="obj.id" />
  </div>
</template>

<script>
  import Name from './DataComponents/Name.vue'
  import Remove from './DataComponents/Remove.vue'

  export default {
    inject: ['store'],
    components: { Name, Remove },
  }

</script>

<style scoped>
  .individual-wrapper {
    width: 100%;
    height: 20px;
    padding-left: 5px;
  }

</style>
