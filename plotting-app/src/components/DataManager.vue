<template>
  <div class="individual-data-wrapper" v-for="(meta, index) in metaData" :key="meta.name">
    <div class="data-names">
      <p class="data-name" :title="meta.name"> {{ meta.name }} </p>
    </div>
    <div class="data-options">
      <WidthPointsToggle :name="meta.name"
                         @widthtoggle="widthPtToggle"
      />

      <div class="spline-dropdown">
        <input type="color" disabled value="#ffffff">
        <div class="spline-dropdown-content">
          <p v-for="freq in splineYearFreq" :key="freq" @click="toggleWidthSpline($event, freq, name)"> {{ freq }}yrs </p>
        </div>
      </div>

      <div class="spline-dropdown">
        <input type="checkbox" class="toggle-width-pts">
        <div class="spline-dropdown-content">
          <p v-for="freq in splineYearFreq" :key="freq" @click="toggleIndexPoints($event, freq, name)"> {{ freq }}yrs </p>
        </div>
      </div>

      <div class="spline-dropdown">
        <input type="color" disabled value="#ffffff">
        <div class="spline-dropdown-content">
          <p v-for="freq in splineYearFreq" :key="freq" @click="toggleIndexSpline($event, freq, name)"> {{ freq }}yrs </p>
        </div>
      </div>

      <PointsColorSwatch :name="meta.name"
                         :color="meta.color"
                         @colorchange="colorValChange"
      />

      <div class="delete-div" @click="deleteSet(name)">
        <img src="../assets/delete-button.png" class="delete-img" title="Remove series">
      </div>
    </div>
  </div>
</template>

<script>
  import WidthPointsToggle from './DataComponents/WidthPointsToggle.vue'
  import PointsColorSwatch from './DataComponents/PointsColorSwatch.vue'

  import traces from '../modules/traces.js'
  import median from '../modules/median.js'
  import simpleSmoothingSpline from 'simple-smoothing-spline'

  export default {
    inject: ['store'],
    props: ['seriesData'],
    components: { WidthPointsToggle, PointsColorSwatch },
    data() {
      return {
        splineYearFreq: [20, 30, 50, 100, 200],
        splineFunctions: [this.toggleWidthSpline, this.toggleIndexPoints, this.toggleIndexSpline],
        splineCache: [],
      }
    },
    computed: {
      metaData: function () {
        return this.seriesData.map(e => {
          let metaObj = new Object()
          metaObj.name = e.name
          metaObj.color = '#000000'
          metaObj.spline20 = []
          metaObj.spline30 = []
          metaObj.spline50 = []
          metaObj.spline100 = []
          metaObj.spline200 = []
          return metaObj
        })
      },
    },
    methods: {
      test(i) {
        console.log('test')
      },
      colorValChange(info) {
        let name = info.name
        let data = this.seriesData.find(obj => obj.name == name)
        let color = info.color
        let mode = 'lines+markers'

        // update meta data w/ new color value
        this.metaData.find(obj => obj.name == name).color = color

        let newTrace = traces.methods.createTrace(data, color, mode)
        let newCurrentData = traces.methods.addTrace(newTrace, this.store.state.currentShownData.slice())
        this.store.methods.newCurrent(newCurrentData)
      },
      widthPtToggle(info) {
        let name = info.name
        let data = this.seriesData.find(obj => obj.name == name)
        let color = this.metaData.find(obj => obj.name == name).color
        let mode = 'lines+markers'

        let toggleOn = info.toggleOn
        let newCurrentData
        if (toggleOn) {
          let newTrace = traces.methods.createTrace(data, color, mode)
          newCurrentData = traces.methods.addTrace(newTrace, this.store.state.currentShownData.slice())
        } else {
          newCurrentData = traces.methods.addTrace(name, this.store.state.currentShownData.slice())
        }
        this.store.methods.newCurrent(newCurrentData)
      },
      // each input's name is the datasets name
      toggleSplineCheckbox(e) {
        let checkbox = e.target.parentElement.previousElementSibling
        if (e.target.classList.contains('active')) {
          e.target.className = e.target.className.replace(' active', '')
          let activeOptions = e.target.parentElement.getElementsByClassName('active')
          checkbox.checked = (activeOptions.length > 0) ? true : false
        } else {
          e.target.className += ' active'
          checkbox.checked = true
        }

        return checkbox.name
      },
      toggleColorSwatch(e) {
        let swatch = e.target.parentElement.previousElementSibling
        let pTag = e.target
        if (pTag.classList.contains('active')) {
          pTag.className = pTag.className.replace(' active', '')
          let activeOptions = pTag.parentElement.getElementsByClassName('active')
          swatch.disabled = (activeOptions.length > 0) ? false : true
          if (activeOptions.length <= 0) {
            swatch.value = '#ffffff'
          }
        } else {
          e.target.className += ' active'
          // if disabled (no color selected), change color to black (show it is active)
          // else, do nothing (maintain user selected color)
          if (swatch.disabled) {
            swatch.value = '#000000'
          }
          swatch.disabled = false
        }
      },
      saveSpline(freq, name) {
        let lambda = 0.00001 * Math.pow(2, 9.9784 * Math.log(freq) + 3.975)
        let dataObj

        for (let obj of this.seriesData) {
          if (obj.name == name) {
            dataObj = obj
            break
          }
        }

        let data = []
        for (let i = 0; i < dataObj.x.length; i++) {
          let x = dataObj.x[i]
          let y = dataObj.y[i]
          let pairObj = new Object()
          pairObj.x = x
          pairObj.y = y
          data.push(pairObj)
        }

        const spline = simpleSmoothingSpline(data, { 'lambda': lambda })

        let xArr = []
        let yArr = []
        for (let obj of spline.points) {
          xArr.push(obj.x)
          yArr.push(obj.y)
        }

        let newSplineObj = new Object()
        newSplineObj.name = name
        newSplineObj.freq = freq
        newSplineObj.x = xArr
        newSplineObj.y = yArr

        this.splineCache.push(newSplineObj)

        console.log('spline cache', this.splineCache)
      },
      toggleWidthSpline(e, freq, name) {
        this.toggleColorSwatch(e)
        let color = e.target.parentElement.previousElementSibling.value
        for (let obj of this.splineCache) {
          if (obj.name == name && obj.freq == freq) {
            this.addTrace(color, name, this.splineCache)
            return
          }
        }

        this.saveSpline(freq, name)
        this.addTrace(color, name, this.splineCache)

        console.log(name, freq, 'spline toggled')
        // send data to plotly
      },
      toggleIndexPoints(e, freq, name) {
        this.toggleSplineCheckbox(e)
        console.log(name, freq, 'index toggled')
        this.saveSpline(freq, name)
      },
      toggleIndexSpline(e, freq, name) {
        this.toggleColorSwatch(e)
        console.log(name, freq, 'spline toggled')
        // send data to plotly
      },
      colorChange(e, name) {
        let copy = JSON.parse(JSON.stringify(this.store.state.currentShownData))
        copy.map(obj => {
          if (obj.name == name || name == 'All Data') {
            obj.line.color = e.target.value
            this.store.methods.newCurrent(copy)
          }
        })
      },
      deleteSet(name) {
        let setDiv = document.getElementById(name)
        setDiv.remove()

        function removeLoop (arr) {
          for (let i = arr.length - 1; i >= 0; i--) {
            let set = arr[i]
            if (set.name == name) {
              arr.splice(i, 1)
            }
          }

          return arr
        }

        removeLoop(this.seriesData)
        let copy = removeLoop(this.store.state.currentShownData.slice())
        this.store.methods.newCurrent(copy)
      },
    },
  }

</script>

<style scoped>
  p {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    display: inline;
  }

  input[type="color"], input[type="checkbox"] {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 1px solid #797979;
    border-radius: 5px;
    margin: 0;
    box-sizing: border-box;
  }

  input[type="color"] {
    margin: 0;
    margin-right: 16px;
  }

  input[type="checkbox"] {
    border: 2px solid #797979;
    margin-right: 16px;
  }

  input[type="checkbox"]:checked {
    background: #797979;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
  	padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
  	border: 1px solid #797979;
    padding: 0;
    margin: 0;
    border-radius: 4px;
  }

  input[type="color"]::-moz-color-swatch {
    border: 1px solid #797979;
    padding: 0;
    margin: 0;
    border-radius: 4px;
  }

  .individual-data-wrapper {
    width: 100%;
  }

  .data-names {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    width: 105px;
    height: 18px;
  }

  .data-name {
    display: inline-block;
    width: 95px;
    height: 18px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .data-options {
    width: 60%;
    height: 18px;
  }

  .spline-dropdown {
    position: relative;
    display: inline-block;
    margin: 0;
  }

  .spline-dropdown:hover .spline-dropdown-content {
    display: block;
  }

  .spline-dropdown-content {
    display: none;
    position: absolute;
    margin-left: 10px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 0;
    z-index: 999999;
  }

  .spline-dropdown-content p {
    display: block;
    font-weight: normal;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
  }

  .spline-dropdown-content p:hover {
    background: #b5b5b5;
    color: #f6f6f6;
  }

  .spline-dropdown-content p.active {
    background: #797979;
    color: #f6f6f6;
  }

  .delete-div {
    width: 18px;
    height: 18px;
  }

  .delete-img {
    width: 12px;
    height: 12px;
  }

</style>
