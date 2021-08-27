<template>
  <div id="wrapper">
    <Info :info="info"
          :width="20"
          :height="20"
    />

    <div class="rd-options">
      <Toggle :id="id" />
      <Toggle :id="id" />
      <Toggle :id="id" />
    </div>
  </div>
</template>

<script>
  import Info from './Info.vue'
  import Toggle from './Toggle.vue'

  export default {
    props: ['id'],
    components: { Info, Toggle },
    data() {
      return {
        info: ['options info']
      }
    },
    methods: {
      click: function() {
        console.log('clicked')
      }
    }
  }
</script>

<style scoped>
  p {
    color: red;
    margin: 0;
    padding: 0;
  }

  .rd-options {
  }

  #wrapper {
    position: absolute;
    margin-left: 118px;
    margin-top: -24px;
    height: 20px;
    background: #f6f6f6;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    width:auto;
  }
</style>
