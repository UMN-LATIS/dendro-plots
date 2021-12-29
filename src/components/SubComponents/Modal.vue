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
  import Toggle from './Toggle.vue'
  import Dropdown from './Dropdown.vue'
  import ColorSwatch from './ColorSwatch.vue'
  import HoverWrapper from './HoverWrapper.vue'

  export default {
    inject: ['store'],
    props: ['id', 'top'],
    components: { Toggle, Dropdown, ColorSwatch, HoverWrapper },
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
            info: 'Toggle raw data appearance in plot.',
            toggleProp: 'rawPointsActive',
          }, // raw points toggle
          {
            id: this.id,
            left: 0,
            width: 152,
            component: 'Dropdown',
            info: 'Select visualization spline wavelength for raw data.',
            options: this.splineOptions,
            optionModifer: 'detrending spline',
            dropdownProp: 'rawSplineFreq',
          }, // raw spline dropdown
          {
            id: this.id,
            left: 0,
            width: 114,
            component: 'Dropdown',
            info: 'Select plot for raw data appearance.',
            options: this.store.cache.plots,
            optionModifer: ': raw data',
            dropdownProp: 'rawPlotLocation',
          }, // raw plot dropdown
          {
            id: this.id,
            left: 0,
            width: 125,
            component: 'Dropdown',
            info: 'Select detrending spline wavelength for indexing raw data.',
            options: this.splineOptions,
            optionModifer: 'index points',
            dropdownProp: 'indexPointsFreq',
          }, // index points dropdown
          {
            id: this.id,
            left: 0,
            width: 161,
            component: 'Dropdown',
            info: 'Select visualization spline wavelength for indexed data.',
            options: this.splineOptions,
            optionModifer: 'visualization points',
            dropdownProp: 'indexSplineFreq',
          }, // index spline dropdown
          {
            id: this.id,
            left: 0,
            width: 124,
            component: 'Dropdown',
            info: 'Select plot for indexed data appearance.',
            options: this.store.cache.plots,
            optionModifer: ': index data',
            dropdownProp: 'indexPlotLocation',
          }, // index plot dropdown
          {
            id: this.id,
            left: 0,
            width: 16,
            component: 'ColorSwatch',
            info: 'Select color for this time series.',
          }, // color
          {
            id: this.id,
            left: -20,
            width: 20,
            component: 'Toggle',
            info: 'Toggle color/gray between time series and spline..',
            toggleProp: 'applyColorToRaw',
          }, // color toggle
          {
            id: this.id,
            left: 0,
            width: 124,
            component: 'Dropdown',
            info: 'Select shape of marker for data values.',
            options: this.store.cache.shapes,
            optionModifer: '',
            dropdownProp: 'shape',
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
    z-index: 9999;
    height: 20px;
    background: #f6f6f6;
    border: 1.5px solid #bdbdbd;
    border-left: none;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    width: 878px;
  }
</style>
