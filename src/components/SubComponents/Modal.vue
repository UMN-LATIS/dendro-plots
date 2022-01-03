<template>
  <div class="modal-wrapper"
       :style=" { top: top + 'px' } "
  >

    <HoverWrapper v-for="(data, i) in modalTools" :key="i"
                  :isMarginLeft="data.left"
                  :isWidth="data.width"
                  :isData="data"
                  :isComponent="data.component"
                  :info="data.info"
    />

  </div>
</template>

<script>
  import HoverWrapper from './HoverWrapper.vue'

  export default {
    inject: ['store'],
    props: ['id', 'top'],
    components: { HoverWrapper },
    data: function() {
      return {
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
      }
    },
    computed: {
      modalTools: function() {
        // all widths decided by inspecting element in dev tools (+5 for wiggle room)
        return [
          {
            id: this.id,
            left: -20,
            width: 20,
            component: 'Toggle',
            info: ['Toggle raw data appearance in plot.'],
            toggleProp: 'rawPointsActive',
          }, // raw points toggle
          {
            id: this.id,
            left: 0,
            width: 161,
            component: 'Dropdown',
            info: ['Select visualization spline wavelength for raw data.'],
            options: this.splineOptions,
            optionModifer: 'visualization spline',
            mainProp: 'rawSplineFreq',
            actions: ['rawSplineFreq', 'indexPointsFreq'],
            disableProp: false,
          }, // raw spline dropdown
          {
            id: this.id,
            left: 0,
            width: 111,
            component: 'Dropdown',
            info: ['Select plot for raw data appearance.'],
            options: this.store.cache.plots,
            optionModifer: ': raw data',
            mainProp: 'rawPlotLocation',
            actions: ['rawPlotLocation'],
            disableProp: false,
          }, // raw plot dropdown
          {
            id: this.id,
            left: 0,
            width: 124,
            component: 'Dropdown',
            info: ['Select detrending spline wavelength for indexing raw data.'],
            options: this.splineOptions,
            optionModifer: 'spline index',
            mainProp: 'indexPointsFreq',
            actions: ['indexPointsFreq'],
            disableProp: false,
          }, // index points dropdown
          {
            id: this.id,
            left: 0,
            width: 161,
            component: 'Dropdown',
            info: ['Select visualization spline wavelength for indexed data.',
                   'Index points must be selected to enable this.'],
            options: this.splineOptions,
            optionModifer: 'visualization spline',
            mainProp: 'indexSplineFreq',
            actions: ['indexSplineFreq'],
            disableProp: 'indexPointsFreq',
          }, // index spline dropdown
          {
            id: this.id,
            left: 0,
            width: 120,
            component: 'Dropdown',
            info: ['Select plot for indexed data appearance.'],
            options: this.store.cache.plots,
            optionModifer: ': index data',
            mainProp: 'indexPlotLocation',
            actions: ['indexPlotLocation'],
            disableProp: false,
          }, // index plot dropdown
          {
            id: this.id,
            left: 0,
            width: 16,
            component: 'ColorSwatch',
            info: ['Select color for this time series.'],
          }, // color
          {
            id: this.id,
            left: -20,
            width: 20,
            component: 'Toggle',
            info: ['Toggle color/gray between time series and spline.'],
            toggleProp: 'applyColorToRaw',
          }, // color toggle
          {
            id: this.id,
            left: 0,
            width: 124,
            component: 'Dropdown',
            info: ['Select shape of marker for data values.'],
            options: this.store.cache.shapes,
            optionModifer: '',
            mainProp: 'shape',
            actions: ['shape'],
            disableProp: false,
          }, // shapes dropdown
        ]
      }
    }
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
    z-index: 99;
    height: 20px;
    background: #f6f6f6;
    border: 1.5px solid #bdbdbd;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 880px;
  }
</style>
