<template>
    <p class="header">Raw Data Options</p>
    <div class="option-div" v-for="(data, i) in options" :key="i">
        <p class="option-name" title="words">{{ data.optionName }}</p>
        <component :is="data.component" v-bind="data" :title="data.info" />
    </div>
</template>

<script>
import HoverWrapper from './HoverWrapper.vue'
import Toggle from './Toggle.vue'
import Dropdown from './Dropdown.vue'
import ColorSwatch from './ColorSwatch.vue'

export default {
    inject: ['store'],
    components: { HoverWrapper, Toggle, Dropdown, ColorSwatch },
    props: ['id'],
    data: function() {
      return {
        dropdownOptions: [
                          { value: false, name: 'None' },
                          { value: 5, name: '5yr' },
                          { value: 10, name: '10yr' },
                          { value: 20, name: '20yr' },
                          { value: 30, name: '30yr' },
                          { value: 50, name: '50yr' },
                          { value: 100, name: '100yr' },
                          { value: 200, name: '200yr' },
                          { value: 0.5, name: '50%' },
                          { value: 0.67, name: '67%' },
                        ],
      }
    },
    computed: {
        options: function() {
            return [
                {
                    id: this.id,
                    left: -20,
                    top: -30,
                    width: 20,
                    component: 'Toggle',
                    info: ['Toggle appearance of raw data.'],
                    toggleProp: 'rawPointsActive',
                    optionName: 'Show/Hide:',
                }, // raw points toggle
                {
                    id: this.id,
                    left: 0,
                    top: -30,
                    width: 16,
                    component: 'ColorSwatch',
                    info: ['Select color for this data.'],
                    optionName: 'Line Color:'
                }, // color
                {
                    id: this.id,
                    left: 0,
                    top: -30,
                    width: 85,
                    component: 'Dropdown',
                    info: ['Select marker shape for data.'],
                    options: this.store.cache.shapes,
                    optionModifer: '',
                    mainProp: 'shape',
                    actions: ['shape'],
                    disableProp: false,
                    optionName: 'Marker:'
                }, // shapes dropdown
                {
                    id: this.id,
                    left: -20,
                    top: -30,
                    width: 20,
                    component: 'Toggle',
                    info: ['Toggle color/gray between data/spline.'],
                    toggleProp: 'applyColorToRaw',
                    optionName: 'Grayscale Toggle:'
                }, // color toggle
                {
                    id: this.id,
                    left: 0,
                    top: -30,
                    width: 149,
                    component: 'Dropdown',
                    info: ['Select wavelength of visualization spline for raw data'],
                    options: this.dropdownOptions,
                    optionModifer: ' ',
                    mainProp: 'rawSplineFreq',
                    actions: ['rawSplineFreq', 'indexPointsFreq'],
                    disableProp: false,
                    optionName: 'Visual Spline:'
                }, // raw spline dropdown
            ]
        },
    }
}
</script>

<style scoped>
p {
    margin: 0 5px 0 0;
}

.header {
    font-style: italic;
    text-decoration: underline;
    font-size: 16px;
}

.option-div {
    display: flex;
    justify-content: space-between;
    padding-right: 2px;
}

.option-name {
    font-size: 15px;
}
</style>