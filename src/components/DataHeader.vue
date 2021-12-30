<template>
  <div>
    <HoverWrapper :isMarginLeft="0"
                  :isWidth="20"
                  :isData="{}"
                  :isComponent="'FileUpload'"
                  :info="['Accepts: comma-, tab-, space-demlimited, .rwl, .json.',
                         'Accepts multiple files with multiple series in upload sequence.']"
    />

    <HoverWrapper :isMarginLeft="-40"
                  :isWidth="40"
                  :isData="{}"
                  :isComponent="'Text'"
                  :info="['Click on time series name to show/hide data plotting options.']"
    />

    <div v-if="store.cache.loadSequence.length"
         style="display: inline;"
    >
      <HoverWrapper :isMarginLeft="-20"
                    :isWidth="20"
                    :isData="{
                        imageName: 'bullet-points',
                        callback: modalToggle,
                      }"
                    :isComponent="'ClickIcon'"
                    :info="['Click to toggle data modals.']"
      />

      <Sort />
    </div>
  </div>

  <div v-if="store.cache.loadSequence.length">
    <div id="additional-buttons">
      <HoverWrapper :isMarginLeft="-20"
                    :isWidth="20"
                    :isData="{
                        imageName: 'spaghetti-plot',
                        callback: spagToggle,
                      }"
                    :isComponent="'ClickIcon'"
                    :info="['Click to toggle spaghetti plot.']"
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
        spagActive: false,
      }
    },
    methods: {
      spagToggle: function() {
        this.spagActive = !this.spagActive
        this.store.methods.spagAction(this.spagActive)
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
