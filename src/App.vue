<template>
  <div id="wrapper">
    <div id="management-wrapper">
      <div id="file-mangement">
        <FileManager />
      </div>
      <DataHeader id="data-header" />
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
      //parentSite: 'http://localhost:4000',
      parentSite: "https://umn-latis.github.io/leaflet-treering/",
    };
  },
  methods: {
    onMessage: function(e) {
      if (e.origin !== this.parentSite) {
        return;
      }
      let data = [];
      let pointsObj = e.data.points;
      if (pointsObj.ew && pointsObj.lw) {
        data.push(pointsObj.ew);
        data.push(pointsObj.lw);
      }
      data.push(pointsObj.tw);
      store.methods.initializeData(data);
    },
},
    mounted() {
      if (!window.opener) {
        return
      }
      window.opener.postMessage('open', this.parentSite)
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
}

#file-mangement {
  width: inherit;
  height: 24px;
  min-height: 24px;
  overflow: hidden;
  margin-top: 5px;
  margin-bottom: 5px;
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
