<template>
  <div class="individual-data-wrapper" v-if="dataSetNames && dataSetNames.length > 2" v-for="(name, index) in dataSetNames" :key="name" :id="name">
    <div class="data-names">
      <p class="data-name" :title="name"> {{ name }} </p>
    </div>
    <div class="data-options">
      <input type="color" class="color-input" @change="colorChange($event, name)">
      <input type="checkbox" class="toggle-width-pts" @change="toggleWidthPoints($event, name)">

      <div class="spline-dropdown" v-for="(func, index) in splineFunctions" :key="index">
        <input type="checkbox" disabled :name="name">
        <div class="spline-dropdown-content">
          <p v-for="freq in splineYearFreq" :key="freq" @click="func($event, freq, name)"> {{ freq }}yrs </p>
        </div>
      </div>

      <div class="delete-div" v-if="index > 1" @click="removeSet(name)">
        <img src="../assets/delete-button.png" class="delete-img">
      </div>
    </div>
  </div>
</template>

<script>
  import median from '../composables/median.js'

  export default {
    props: ['dataObjArray'],
    data() {
      return {
        splineYearFreq: [20, 30, 50, 100, 200],
        splineFunctions: [this.toggleWidthSpline, this.toggleIndexPoints, this.toggleIndexSpline],
        shownDataArray: [],
      }
    },
    computed: {
      dataSetNames: function () {
        if (!this.dataObjArray) {
          return
        }

        var dataNamesArray = ['All Data', 'Median']
        for (let obj of this.dataObjArray) {
          if (!dataNamesArray.includes(obj.name)) {
            dataNamesArray.push(obj.name)
          }
        }

        return dataNamesArray
      },
    },
    methods: {
      addTrace(color, name) {
        let trace

        if (name == 'Median') {
          trace = median(this.shownDataArray)
        } else if (name == 'All Data') {
          this.shownDataArray = []
          this.dataObjArray.map(e => {
            let trace = new Object ()
            trace.x = e.x.slice()
            trace.y = e.y.slice()
            trace.name = e.name
            trace.line = { 'color': color }
            trace.mode = 'lines+markers'
            trace.type = 'scattergl'
            this.shownDataArray.push(trace)
          })
          trace = null // prevent if statement below
        } else {
          this.dataObjArray.map(e => {
            if (e.name == name) {
              trace = new Object()
              trace.x = e.x.slice()
              trace.y = e.y.slice()
            }
          })
        }

        if (trace) {
          trace.name = name
          trace.line = { 'color': color }
          trace.mode = 'lines+markers'
          trace.type = 'scattergl'
          this.shownDataArray.push(trace)
        }
      },
      removeTrace(name) {
        if (name == 'All Data') {
          this.shownDataArray = []
        }

        this.shownDataArray.map((e, i) => {
          if (e.name == name) {
            this.shownDataArray.splice(i, 1)
          }
        })
      },
      // each input's name is the datasets name
      colorChange(e, name) {
        this.shownDataArray.map(o => {
          if (o.name == name || name == 'All Data') {
            o.line.color = e.target.value
          }
        })

      },
      toggleWidthPoints(e, name) {
        let color = e.target.parentElement.getElementsByClassName('color-input')[0].value
        if (e.target.checked) {
          this.addTrace(color, name)
        } else {
          this.removeTrace(name)
        }

        if (name == 'All Data') {
          let cBoxs = document.getElementsByClassName('toggle-width-pts')
          for (let i = 2; i < cBoxs.length; i++) {
            cBoxs[i].checked = e.target.checked
          }
        }

      },
      toggleCheckbox(e) {
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
      // id = spline year frequency
      toggleWidthSpline(e, freq, name) {
        this.toggleCheckbox(e)
        console.log(name, freq, ' spline toggled')
        // send data to plotly
      },
      toggleIndexPoints(e, freq, name) {
        this.toggleCheckbox(e)
        console.log(name, freq, ' index toggled')
      },
      toggleIndexSpline(e, freq, name) {
        this.toggleCheckbox(e)
        console.log(name, freq, 'spline toggled')
        // send data to plotly
      },
      removeSet(name) {
        let setDiv = document.getElementById(name)
        setDiv.remove()

        for (let i = this.dataObjArray.length - 1; i >= 0; i--) {
          let set = this.dataObjArray[i]
          if (set.name == name) {
            this.dataObjArray.splice(i, 1)
          }
        }
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
    margin-right: 16px;
  }

  input[type="checkbox"] {
    border: 2px solid #797979;
    margin-right: 10px;
  }

  input[type="checkbox"]:checked {
    background: #797979;
  }

  input[type="color"]::-webkit-color-swatch-wrapper {
  	padding: 0;
  }

  input[type="color"]::-webkit-color-swatch {
  	border: 1px solid #797979;
    border-radius: 5px;
  }

  input[type="color"]::-moz-color-swatch {
    border: 1px solid #797979;
    border-radius: 5px;
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
    margin: 0 0 0 6px;
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
    width: inherit;
    height: inherit;
  }

</style>
