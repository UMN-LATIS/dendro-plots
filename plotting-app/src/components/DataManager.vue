<template>
  <div class="individual-data-wrapper" v-if="fileNames && fileNames.length > 2" v-for="(name, index) in fileNames" :key="name" :id="name">
    <div class="data-names">
      <p class="data-name" :title="name"> {{ name }} </p>
    </div>
    <div class="data-options">
      <input type="color" @change="colorChange" :name="name">
      <input type="checkbox" @change="toggleWidthPoints" :name="name">
      <div class="spline-dropdown">
        <input type="checkbox" disabled :name="name">
        <div class="spline-dropdown-content">
          <p class="width-spline-options" v-for="freq in splineYearFreq" :key="freq" @click="toggleWidthSpline" :id="freq"> {{ freq }}yrs </p>
        </div>
      </div>
      <input type="checkbox" @change="toggleIndexPoints" :name="name">
      <div class="spline-dropdown">
        <input type="checkbox" disabled :name="name">
        <div class="spline-dropdown-content">
          <p class="index-spline-options" v-for="freq in splineYearFreq" :key="freq" @click="toggleIndexSpline" :id="freq"> {{ freq }}yrs </p>
        </div>
      </div>
      <div class="delete-div" v-if="index > 1" @click="removeSet(name)">
        <img src="../assets/delete-button.png" class="delete-img">
      </div>
    </div>
  </div>
</template>

<script>
  import formatDataObjArray from '../composables/formatData.js'

  export default {
    props: ['formattedFileData'],
    data() {
      return {
        splineYearFreq: [20, 30, 50, 100, 200],
      }
    },
    computed: {
      fileNames: function () {
        if (!this.formattedFileData) {
          return
        }

        var dataNamesArray = ['All Data', 'Median']
        for (let i = 0; i < this.formattedFileData.length; i++) {
          if (!this.formattedFileData[i]) {
            return
          }

          let header = this.formattedFileData[i][0]
          for (let j = 1; j < header.length; j++) {
            dataNamesArray.push(header[j])
          }
        }

        return dataNamesArray
      },
      dataObjArray: function () {
        return formatDataObjArray(this.formattedFileData)
      }
    },
    methods: {
      // each input's name is the datasets name
      colorChange(e) {
        console.log(e.target.name, ' color change')
      },
      toggleWidthPoints(e) {
        console.log(e.target.name, ' points toggled')
      },
      toggleCheckbox(e) {
        let checkbox = e.target.parentElement.previousElementSibling
        if (e.target.classList.contains('active')) {
          e.target.className = e.target.className.replace(' active', '')
          let options = document.getElementsByClassName(e.target.className)
          let remainChecked = null
          for (let p of options) {
            if (p.classList.contains('active') == true) {
              remainChecked = true
              break
            } else {
              remainChecked = false
            }
          }
          checkbox.checked = (remainChecked) ? true : false
        } else {
          e.target.className += ' active'
          checkbox.checked = true
        }

        return checkbox.name
      },
      toggleWidthSpline(e) {
        let dataName = this.toggleCheckbox(e)
        console.log(dataName, e.target.id, ' spline toggled')
        // send data to plotly
      },
      toggleIndexPoints(e) {
        console.log(e.target.name, ' index toggled')
      },
      toggleIndexSpline(e) {
        let dataName = this.toggleCheckbox(e)
        console.log(dataName, e.target.id, 'spline toggled')
        // send data to plotly
      },
      removeSet(setName) {
        let setDiv = document.getElementById(setName)
        setDiv.remove()

        this.dataObjArray.forEach((set, i) => {
          if (set.name == setName) {
            this.dataObjArray.splice(i, 1)
          }
        })
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
    margin: 0 6px;
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
