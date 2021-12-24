<template>
  <div v-if="store.cache.loadSequence.length">
    <div>
      <!-- replace hover text wrapper with Vue dynamic components -->
      <div class="dropdown">
        <p class="header">Data </p>
        <div class="dropdown-content">
          <p class="info"
             v-for="blurb in info"
             :key="blurb"> {{ blurb }}
          </p>
        </div>
      </div>

      <ClickIcon id="modalToggle"
                :info="['Click to toggle data modals.']"
                :imageName="'bullet-points'"
                :callback="modalToggle"
      />
      <Sort />
    </div>

    <div id="additional-buttons">
      <ClickIcon id="spagToggle"
                :info="['Click to toggle spaghetti plot.']"
                :imageName="'spaghetti-plot'"
                :callback="spagToggle"
      />
      <UndoRedoButtons />
      <!--
      <Toggle id="null"
              :toggleProp="null"
      />
      <Toggle id="null"
              :toggleProp="null"
      />
      <Toggle id="null"
              :toggleProp="null"
      />
      <Toggle id="null"
              :toggleProp="null"
      />
      <Toggle id="null"
              :toggleProp="null"
      />
      -->
    </div>

    <div>
      <DataManager :useCache="true" />
    </div>
  </div>
</template>

<script>
  import Sort from './SubComponents/Sort.vue'
  import UndoRedoButtons from './SubComponents/UndoRedoButtons.vue'
  import Toggle from './SubComponents/Toggle.vue'
  import ClickIcon from './SubComponents/ClickIcon.vue'
  import DataManager from './DataManager.vue'

  export default {
    inject: ['store'],
    components: { Sort, UndoRedoButtons, Toggle, ClickIcon, DataManager },
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
    display: none;
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
  }

  #additional-buttons {
    display: block;
  }

</style>
