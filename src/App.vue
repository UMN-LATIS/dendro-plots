<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <DataHeader />
      <div id="data-management">
        <DataManager :useCache="false" />
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

import store from "./modules/store.js";

export default {
  name: "App",
  provide: { store },
  components: { FileManager, DataHeader, DataManager, PlotManager },
  data() {
    return {
      parentSites: ['https://dendro.elevator.umn.edu', 'https://umn-latis.github.io', 'http://localhost:4000'],
    };
  },
  methods: {
    onMessage: function(e) {
      if (!this.parentSites.includes(e.origin)) {
        return;
      }

      // possible data types: new points or year to highlight
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
},
    mounted() {
      store.methods.initializeData();
      if (!window.opener) {
        return
      }
      window.opener.postMessage('open', "*")
      window.addEventListener('message', this.onMessage, false)
    },
    beforeUnmount() {
      window.removeEventListener('message', this.onMessage, false)
    }
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
  width: 140px;
  min-width: 140px;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 999;
}

#data-management {
  width: inherit;
  height: 100%;
  overflow-y: visible;
  overflow-x: hidden;
}

#plot-management {
  width: calc(100% - 140px);
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
