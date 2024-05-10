<!--
  Purpose:
    Creates a horizontal popout which hosts interactive plotting tools.

  Props:
    id:
      ID of dataset. Allows for getting and setting of dataset properties.
    top:
      Pixel position from top of window. Dynamic changes when user scrolls.

  Computed:
    modalTools:
      Returns an array of tool objects. Each object has specific information
      for the HoverWrapper component. Currently 10 tools:
        (1) Toggle raw data points.
        (2) Raw points plot location.
        (3) Raw points spline selection.
        (4) Raw points index selection.
        (5) Index points plot location.
        (6) Index point frequency selection.
        (7) Index points spline selection.
        (8) Color of points.
        (9) Toggle which points colored.
        (10) Shape selection.

  Methods:
-->


<template>
  <div class="modal-wrapper"
       :style=" { top: top + 'px' } ">

    <HoverWrapper v-for="(data, i) in modalTools" :key="i"
                  :isMarginLeft="data.left"
                  :isMarginTop="data.top"
                  :isWidth="data.width"
                  :isData="data"
                  :isComponent="data.component"
                  :info="data.info"
                  title="words"
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
        dropdownOptions: [
                          { id: false, name: 'None' },
                          { id: 5, name: '5yr' },
                          { id: 10, name: '10yr' },
                          { id: 20, name: '20yr' },
                          { id: 30, name: '30yr' },
                          { id: 50, name: '50yr' },
                          { id: 100, name: '100yr' },
                          { id: 200, name: '200yr' },
                          { id: 0.5, name: '50%' },
                          { id: 0.67, name: '67%' },
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
            top: -30,
            width: 20,
            component: 'Toggle',
            info: ['Toggle appearance of raw data'],
            toggleProp: 'rawPointsActive',
          }, // raw points toggle
          {
            id: this.id,
            left: 0,
            top: -30,
            width: 93,
            component: 'Dropdown',
            info: ['Select plot for raw data appearance'],
            options: this.store.cache.plots,
            optionModifer: 'Raw data: ',
            mainProp: 'rawPlotLocation',
            actions: ['rawPlotLocation'],
            disableProp: false,
          }, // raw plot dropdown
          {
            id: this.id,
            left: 0,
            top: -30,
            width: 149,
            component: 'Dropdown',
            info: ['Select wavelength of visualization spline for raw data'],
            options: this.dropdownOptions,
            optionModifer: 'Raw data viz spline: ',
            mainProp: 'rawSplineFreq',
            actions: ['rawSplineFreq', 'indexPointsFreq'],
            disableProp: false,
          }, // raw spline dropdown
          {
            id: this.id,
            left: 0,
            top: -30,
            width: 98,
            component: 'Dropdown',
            info: ['Select plot for indexed data appearance'],
            options: this.store.cache.plots,
            optionModifer: 'Index data: ',
            mainProp: 'indexPlotLocation',
            actions: ['indexPlotLocation'],
            disableProp: false,
          }, // index plot dropdown
          {
            id: this.id,
            left: 0,
            top: -30,
            width: 159,
            component: 'Dropdown',
            info: ['Select spline wavelength for raw data detrending'],
            options: this.dropdownOptions,
            optionModifer: 'Spline detrended index: ',
            mainProp: 'indexPointsFreq',
            actions: ['indexPointsFreq'],
            disableProp: false,
          }, // index points dropdown
          {
            id: this.id,
            left: 0,
            top: -44,
            width: 154,
            component: 'Dropdown',
            info: ['Select wavelength of visualization spline for detrended index',
                   '[Must enable detrended index]'],
            options: this.dropdownOptions,
            optionModifer: 'Index data viz spline: ',
            mainProp: 'indexSplineFreq',
            actions: ['indexSplineFreq'],
            disableProp: 'indexPointsFreq',
          }, // index spline dropdown
          {
            id: this.id,
            left: 0,
            top: -30,
            width: 16,
            component: 'ColorSwatch',
            info: ['Select color for this data'],
          }, // color
          {
            id: this.id,
            left: -20,
            top: -30,
            width: 20,
            component: 'Toggle',
            info: ['Toggle color/gray between data/spline'],
            toggleProp: 'applyColorToRaw',
          }, // color toggle
          {
            id: this.id,
            left: 0,
            top: -30,
            width: 84,
            component: 'Dropdown',
            info: ['Select marker shape for data'],
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
    position: absolute;
    left: 200px;
    height: 20px;
    background: #f6f6f6;
    border: 1.5px solid #f6f6f6;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 804px;
  }
</style>
