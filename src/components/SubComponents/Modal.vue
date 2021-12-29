<template>
  <div class="modal-wrapper"
       :style=" { top: top + 'px' } "
  >

    <Info :info="info"
          :width="20"
          :height="20"
    />

    <!-- ALL SPACER DIVS DECIDED BY WIDTH OF SELECT TAG WIDTH IN DEV TOOLS (+5 wiggle room)-->

    <!-- data options -->
    <Toggle :id="id"
            :toggleProp="'rawPointsActive'"
    />
    <Dropdown :id="id"
              :options="splineOptions"
              :optionModifer="'detrending spline'"
              :dropdownProp="'rawSplineFreq'"
    />
    <div style="width: 152px"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="store.cache.plots"
              :optionModifer="': raw data'"
              :dropdownProp="'rawPlotLocation'"
     />

    <!-- index options -->
    <div style="width: 114px"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="splineOptions"
              :optionModifer="'index points'"
              :dropdownProp="'indexPointsFreq'"
    />
    <div style="width: 125px"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="splineOptions"
              :optionModifer="'visualization spline'"
              :dropdownProp="'indexSplineFreq'"
    />
    <div style="width: 161px"></div> <!-- spacer div -->
    <Dropdown :id="id"
              :options="store.cache.plots"
              :optionModifer="': index data'"
              :dropdownProp="'indexPlotLocation'"
     />

     <!-- color options -->
     <div style="width: 124px"></div> <!-- spacer div -->
     <ColorSwatch :id="id" />
     <div :style="{ width: toggleWidth + 'px' }"></div> <!-- spacer div -->
     <Toggle :id="id"
             :toggleProp="'applyColorToRaw'"
     />
     <!-- marker options -->
     <Dropdown :id="id"
               :options="store.cache.shapes"
               :optionModifer="''"
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
    data: function() {
      return {
        info: ['From left to right, options include: ',
                '1) Toggle raw data appearance in plot.',
                '2) Select visualization spline wavelength for raw data.',
                '3) Select plot for raw data appearance.',
                '4) Select detrending spline wavelength for indexing raw data.',
                '5) Select visualization spline wavelength for indexed data.',
                '6) Select plot for indexed data appearance.',
                '7) Select color for this time series.',
                '8) Toggle color/gray between time series and spline.',
                '9) Select shape of marker for data values.'],
        splineOptions: [
                          { value: false, name: 'No ' },
                          { value: 5, name: '5yr ' },
                          { value: 10, name: '10yr ' },
                          { value: 20, name: '20yr ' },
                          { value: 30, name: '30yr ' },
                          { value: 50, name: '50yr ' },
                          { value: 100, name: '100yr ' },
                          { value: 200, name: '200yr ' },
                          { value: 0.5, name: '50% ' },
                          { value: 0.67, name: '67% ' },
                        ],
        dropdownWidth: 150,
        toggleWidth: 16,
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
    width: 900px;
  }
</style>
