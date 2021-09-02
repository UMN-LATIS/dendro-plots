<template>
  <div class="modal-wrapper"
       :style=" { top: top + 'px' } "
  >

    <Info :info="info"
          :width="20"
          :height="20"
    />

    <!-- data options -->
    <Toggle :id="id"
            :toggleProp="'rawPointsActive'"
    />
    <Dropdown :id="id"
              :options="splineOptions"
              :dropdownProp="'rawSplineFreq'"
    />
    <div style="width: 55px;"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="store.cache.plots"
              :dropdownProp="'rawPlotLocation'"
     />

    <!-- index options -->
    <div style="width: 65px;"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="splineOptions"
              :dropdownProp="'indexPointsFreq'"
    />
    <div style="width: 55px;"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="splineOptions"
              :dropdownProp="'indexSplineFreq'"
    />
    <div style="width: 55px;"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="store.cache.plots"
              :dropdownProp="'indexPlotLocation'"
     />

     <!-- color options -->
     <div style="width: 65px;"></div> <!-- spacer div -->
     <ColorSwatch :id="id" />
     <div style="width: 16px;"></div> <!-- spacer div -->
     <Toggle :id="id"
             :toggleProp="'colorState'"
     />
     <Dropdown :id="id"
               :options="store.cache.shapes"
               :dropdownProp="'shape'"
      />

  </div>
</template>

<script>
  import Info from './Info.vue'
  import Toggle from './Toggle.vue'
  import Dropdown from './Dropdown.vue'
  import ColorSwatch from './ColorSwatch.vue'

  export default {
    inject: ['store'],
    props: ['id', 'top'],
    components: { Info, Toggle, Dropdown, ColorSwatch },
    data() {
      return {
        info: ['options info'],
        splineOptions: [
                          { value: false, name: 'None' },
                          { value: 20, name: '20yr' },
                          { value: 30, name: '30yr' },
                          { value: 50, name: '50yr' },
                          { value: 100, name: '100yr' },
                          { value: 200, name: '200yr' },
                          { value: 0.5, name: '50%' },
                          { value: 0.67, name: '67%' },
                        ]
      }
    },
  }
</script>

<style scoped>
  .option-set {
    margin-left: 5px;
    height: 20px;
  }

  .modal-wrapper {
    position: fixed;
    left: 140px;
    z-index: 9999;
    height: 20px;
    background: #f6f6f6;
    border: 1.5px solid #bdbdbd;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 433px;
  }
</style>
