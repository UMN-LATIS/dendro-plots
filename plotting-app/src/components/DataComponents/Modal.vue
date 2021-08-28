<template>
  <div class="modal-wrapper"
       :style=" { top: top + 'px' } "
  >

    <Info :info="info"
          :width="20"
          :height="20"
    />

    <div class="rd-options">
      <Toggle :id="id"
              :toggleProp="'dataPointsActive'"
      />
    </div>

  </div>
</template>

<script>
  import Info from './Info.vue'
  import Toggle from './Toggle.vue'

  export default {
    inject: ['store'],
    props: ['id', 'top'],
    components: { Info, Toggle },
    data() {
      return {
        info: ['options info'],
      }
    },
  }
</script>

<style scoped>
  .rd-options {
    margin-left: 5px;
  }

  .modal-wrapper {
    position: fixed;
    left: 120px;
    z-index: 999999;
    height: 20px;
    background: #f6f6f6;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    width: auto;
  }
</style>
