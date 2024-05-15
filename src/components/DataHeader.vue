<!--
  Purpose:
    
  Props:

  Computed:

  Methods:
-->

<template>
  <div class="control-panel">
    <div class="next-to-icon">
        <!-- <HoverWrapper :isMarginLeft="-40"
                      :isMarginTop="22"
                      :isWidth="40"
                      :isData="{ text: 'Data' }"
                      :isComponent="'Text'"
                      :info="['Click on time series name to show/hide data plotting options.']"
        /> -->

        <HoverWrapper :isMarginLeft="0"
                      :isMarginTop="22"
                      :isWidth="20"
                      :isData="{}"
                      :isComponent="'FileUpload'"
                      :info="['Accepts: comma-, tab-, space-demlimited, .rwl, .json',
                              'Accepts multiple files with multiple series in upload sequence']"
        />

        <HoverWrapper :isMarginLeft="0"
                      :isMarginTop="22"
                      :isWidth="20"
                      :isData="{}"
                      :isComponent="'FileDownload'"
                      :info="['download button']"
                      @click="modalToggle"
        />

        <HoverWrapper :isMarginLeft="-0"
                      :isMarginTop="-30"
                      :isWidth="70"
                      :isData="
                        {
                          options: [{ value: 1, name: 'CSV' },
                                    { value: 2, name: 'TSV' },
                                    { value: 3, name: 'RWL'}],
                          optionModifer: '1234567',
                        }"
                      :isComponent="'Dropdown'"
                      :info="['Select plot for raw data appearance.']"
        />

        <!-- <div v-if="store.cache.loadSequence.length"
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
          /> -->

          <!-- <Sort /> -->
        <!-- </div> -->

      <div v-if="store.cache.loadSequence.length" style="display: block;">
        <!-- <HoverWrapper :isMarginLeft="-40"
                      :isMarginTop="22"
                      :isWidth="40"
                      :isData="{ text: 'Plot' }"
                      :isComponent="'Text'"
                      :info="['Click on time series name to show/hide data plotting options.']"
        /> -->

        <HoverWrapper :isMarginLeft="-20"
                      :isMarginTop="22"
                      :isWidth="20"
                      :isData="{
                          imageName: 'spaghetti-plot',
                          callback: spagToggle,
                        }"
                      :isComponent="'ClickIcon'"
                      :info="['Toggle spaghetti plot appearance behavior']"
        />

        <Legend v-for="plot in store.cache.plots"
                :key="plot.id"
                :id="plot.id"
        />
        <UndoRedoButtons />
      </div>
    </div>

    <div class="icon">
      <Info />
    </div>
  </div>

  <div v-if="store.cache.loadSequence.length">
    <DataManager :useCache="true" @selectOption="receiveOption"/>
  </div>
</template>

<script>
  import downloadData from "../modules/downloadData.js";

  import Info from './SubComponents/Info.vue'
  import Sort from './SubComponents/Sort.vue'
  import Legend from './SubComponents/Legend.vue'
  import UndoRedoButtons from './SubComponents/UndoRedoButtons.vue'
  import Toggle from './SubComponents/Toggle.vue'
  import ClickIcon from './SubComponents/ClickIcon.vue'
  import DataManager from './DataManager.vue'
  import HoverWrapper from './SubComponents/HoverWrapper.vue'
  import Dropdown from './SubComponents/Dropdown.vue'

  export default {
    inject: ['store'],
    emits: ['selectOption'],
    components: { Info, Sort, Legend, UndoRedoButtons, Toggle, ClickIcon, DataManager, HoverWrapper, Dropdown },
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

          // Find which plots are active. Apply medianA to plot 1, medianB to plot 2 (if active).
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
        //use temporarilly for mass download
        downloadData(this.store.cache.raw)

        // let allOff = true
        // for (let obj of this.store.cache.modals) {
        //   if (obj.active) {
        //     allOff = false
        //     obj.active = false
        //   }
        // }
        // if (allOff) {
        //   for (let obj of this.store.cache.modals) {
        //     obj.active = true
        //   }
        // }
      },
      receiveOption(id) {
        this.$emit('selectOption', id)
      }
    }
  }
</script>

<style scoped>
  div {
    margin: 0;
    margin-left: 2px;
    display: inline;
  }

  .control-panel {
    background-color: white;
    margin-left: 0;
  }

  .next-to-icon {
    display: inline;
    width: max-content;
    height: max-content;
    float: left;
  }

  .icon {
    float: right;
    width: max-content;
    margin: 0;
    margin-right: 4px;
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
