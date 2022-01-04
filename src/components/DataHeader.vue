<template>
  <div>
    <HoverWrapper :isMarginLeft="-40"
                  :isMarginTop="22"
                  :isWidth="40"
                  :isData="{}"
                  :isComponent="'Text'"
                  :info="['Click on time series name to show/hide data plotting options.']"
    />

    <HoverWrapper :isMarginLeft="0"
                  :isMarginTop="22"
                  :isWidth="20"
                  :isData="{}"
                  :isComponent="'FileUpload'"
                  :info="['Accepts: comma-, tab-, space-demlimited, .rwl, .json.',
                          'Accepts multiple files with multiple series in upload sequence.']"
    />

    <div v-if="store.cache.loadSequence.length"
         style="display: inline;"
    >
      <HoverWrapper :isMarginLeft="-20"
                    :isMarginTop="22"
                    :isWidth="20"
                    :isData="{
                        imageName: 'bullet-points',
                        callback: modalToggle,
                      }"
                    :isComponent="'ClickIcon'"
                    :info="['Toggle appearance of all data menus.']"
      />

      <Sort />
    </div>
  </div>

  <div v-if="store.cache.loadSequence.length">
    <div id="additional-buttons">
      <HoverWrapper :isMarginLeft="-20"
                    :isMarginTop="22"
                    :isWidth="20"
                    :isData="{
                        imageName: 'spaghetti-plot',
                        callback: spagToggle,
                      }"
                    :isComponent="'ClickIcon'"
                    :info="['Toggle spaghetti plot appearance behavior.']"
      />

      <UndoRedoButtons />
    </div>

    <div>
      <DataManager :useCache="true" />
    </div>
  </div>
</template>

<script>
  import formatFileData from '../modules/formatFileData.js'

  import Sort from './SubComponents/Sort.vue'
  import UndoRedoButtons from './SubComponents/UndoRedoButtons.vue'
  import Toggle from './SubComponents/Toggle.vue'
  import ClickIcon from './SubComponents/ClickIcon.vue'
  import DataManager from './DataManager.vue'
  import HoverWrapper from './SubComponents/HoverWrapper.vue'

  export default {
    inject: ['store'],
    components: { Sort, UndoRedoButtons, Toggle, ClickIcon, DataManager, HoverWrapper },
    data() {
      return {
        info: ['Click on time series name to show/hide data plotting options.'],
      }
    },
    methods: {
      spagToggle: function() {
        this.store.cache.spagActive = !this.store.cache.spagActive
        if (this.store.cache.spagActive) {
          let activeStates = this.store.states.current.filter(o => (o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq))

          // find which plots are active. Apply medianA to plot 1, medianB to plot 2 (if active).
          let plot1Active = activeStates.some(o => (o.rawPlotLocation == 1 && (o.rawPointsActive || o.rawSplineFreq))
                                                || (o.indexPlotLocation == 1 && (o.indexPointsFreq || o.indexSplineFreq)))
          let plot2Active = activeStates.some(o => (o.rawPlotLocation == 2 && (o.rawPointsActive || o.rawSplineFreq))
                                                || (o.indexPlotLocation == 2 && (o.indexPointsFreq || o.indexSplineFreq)))

          if (plot1Active) {
            this.store.methods.updateCache('states', 220, 'rawPointsActive', true)
          }
          if (plot2Active) {
            this.store.methods.updateCache('states', 221, 'rawPlotLocation', 2)
            this.store.methods.updateCache('states', 221, 'rawPointsActive', true)
          }
        } else {
          this.store.methods.updateCache('states', 220, 'rawPointsActive', false)
          this.store.methods.updateCache('states', 221, 'rawPointsActive', false)
        }

        this.store.cache.updatePlotSwitch = !this.store.cache.updatePlotSwitch
      },
      modalToggle: function() {
        let allOff = true
        for (let obj of this.store.cache.modals) {
          if (obj.active) {
            allOff = false
            obj.active = false
          }
        }
        if (allOff) {
          for (let obj of this.store.cache.modals) {
            obj.active = true
          }
        }
      },
    }
  }
</script>

<style scoped>
  div {
    margin: 0;
    margin-left: 2px;
    display: inline;
  }

  img {
    width: 20px;
    height: 20px;
  }

  input {
    margin: 0;
    padding: 0;
  }

  label {
    padding: 0;
    cursor: pointer;
    margin: 0;
    margin-left: 2px;
    display: inline-block;
  }

  .header {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: black;
    height: 18px;
    display: inline;
    margin: 0;
    margin-right: 8px;
  }

  .info {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    width: max-content;
  }

  .dropdown {
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: 20px;
    margin-left: -26px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
    visibility: visible;
    opacity: 1;
  }

  #additional-buttons {
    display: block;
  }

</style>
