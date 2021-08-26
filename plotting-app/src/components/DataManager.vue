<template>
  <div class="individual-data-wrapper" v-for="obj in store.states.currentStates" :key="obj.id">
    <Name :name="obj.name"
          :file="obj.file"
    />

    <div class="data-options">
      <Toggle :id="obj.id"
              :activeProperty="'dataPointsActive'"
              :toggleChecked="obj.dataPointsActive"
              :toggleDisable="false"
      />

      <Dropdown :id="obj.id"
                :storedFreq="obj.dataSplineFreq"
                :freqProperty="'dataSplineFreq'"
                :activeBool="obj.dataSplineActive"
                :activeProperty="'dataSplineActive'"
      />

      <Toggle :id="obj.id"
              :activeProperty="'indexPointsActive'"
              :toggleChecked="obj.indexPointsActive"
              :toggleDisable="!obj.dataSplineActive"
      />

      <Dropdown :id="obj.id"
                :storedFreq="obj.indexSplineFreq"
                :freqProperty="'indexSplineFreq'"
                :activeBool="obj.indexSplineActive"
                :activeProperty="'indexSplineActive'"
      />

      <ColorSwatch :id="obj.id"
                   :color="obj.color"
      />

      <ColorSwap :id="obj.id"
                 :swapState="obj.colorState"
                 :color="obj.color"
      />

      <Remove :id="obj.id" />

    </div>
  </div>
</template>

<script>
  import Name from './DataComponents/Name.vue'
  import Toggle from './DataComponents/Toggle.vue'
  import Dropdown from './DataComponents/Dropdown.vue'
  import ColorSwatch from './DataComponents/ColorSwatch.vue'
  import ColorSwap from './DataComponents/ColorSwap.vue'
  import Remove from './DataComponents/Remove.vue'

  export default {
    inject: ['store'],
    components: { Name, Toggle, Dropdown, ColorSwatch, ColorSwap, Remove },
  }

</script>

<style scoped>
  .individual-data-wrapper {
    width: 100%;
  }

  .data-options {
    width: 218px;
    height: 20px;
  }

  .delete-div {
    width: 18px;
    height: 18px;
  }

  .delete-img {
    width: 12px;
    height: 12px;
  }

</style>
