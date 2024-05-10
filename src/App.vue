<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <DataHeader/>
      <div id="data-management">
        <DataManager :useCache="false"  @selectOption="receiveOption"/>
      </div>

      
      <div id="options-management">
        <OptionsManager :optionID="this.optionID"/>
      </div>
    </div>

    <div id="plot-management">
      <PlotManager />
    </div>

  </div>
</template>

<script>

import FileManager from "./components/FileManager.vue";
import DataHeader from "./components/DataHeader.vue";
import DataManager from "./components/DataManager.vue";
import PlotManager from "./components/PlotManager.vue";
import OptionsManager from "./components/OptionsManager.vue";

import store from "./modules/store.js";

export default {
  name: "App",
  provide: { store },
  components: { FileManager, DataHeader, DataManager, PlotManager, OptionsManager },
  data() {
    return {
      parentSites: ['https://dendro.elevator.umn.edu', 'https://umn-latis.github.io', 'http://localhost:4000', 'http://127.0.0.1:4000/'],
      optionID: null
    };
  },
  methods: {
    onMessage: function(e) {
      // if (!this.parentSites.includes(e.origin)) {
      //   return;
      // }

      // Possible inputs: New data points (array) or a year to highlight (integer)
      if (typeof e.data == 'object') {
        let data = [];
        let pointsObj = e.data.points;
        data.push(pointsObj.tw);
        if (pointsObj.ew && pointsObj.lw) {
          data.push(pointsObj.ew);
          data.push(pointsObj.lw);
        }
        store.methods.processSentData(data);
      } else {
        store.cache.hightlightYear = e.data;
      }
    },
    receiveOption(id) {
    if (this.optionID == id) {
      this.optionID = null
    }
    else {
      this.optionID = id
    }
  }
  },
  mounted() {
    // Need to send message back to DendroElevator parent window to recieve data.
    store.methods.initializeData();
    if (!window.opener) {
      return
    }
    window.opener.postMessage('open', "*")
    window.addEventListener('message', this.onMessage, false)
  },
  beforeUnmount() {
    window.removeEventListener('message', this.onMessage, false)
  },
}

</script>

<style>
#app,
body,
html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: #f6f6f6;
  overflow: hidden;
}

div {
  display: inline-block;
}

h1 {
  color: black;
}

h2 {
  font-family: Sans-serif;
  color: #797979;
  margin: 0 10px;
}

#wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: nowrap;
}

#management-wrapper {
  width: 200px;
  min-width: 200px;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 999;
  background-color: lightgreen;
}

#data-management {
  width: inherit;
  height: 42.5%;
  overflow-y: visible;
  overflow-x: hidden;
  background-color: white;
}

#plot-management {
  width: calc(100% - 200px);
  height: 100%;
  display: flex;
  flex-direction: column;
}

#options-management {
  width: inherit;
  height: 57.5%;
  position: relative;
  border: 2px solid black;
  background-color: white;
  overflow-y: scroll;
  overflow-x: hidden;
}

#options-management::-webkit-scrollbar { width: 0 !important }
#options-management { overflow: -moz-scrollbars-none; }
</style>
