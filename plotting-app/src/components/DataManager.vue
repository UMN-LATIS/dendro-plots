<template>
  <div class="individual-data-wrapper" v-if="fileNames && fileNames.length > 2" v-for="name in fileNames" :key="name">
    <div class="data-names">
      <p :title="name"> {{ name }} </p>
    </div>
    <div class="data-options">
      <input type="color" @change="colorChange" :id="name">
      <input type="checkbox" @change="toggleWidthPoints" :value="name">
      <div class="spline-dropdown">
        <input type="checkbox" disabled :value="name">
        <div class="spline-dropdown-content">
          <p class="width-spline-options" v-for="freq in splineYearFreq" :key="freq" @click="toggleWidthSpline" :id="freq"> {{ freq }}yrs </p>
        </div>
      </div>
      <input type="checkbox" @change="toggleIndexPoints" :value="name">
      <div class="spline-dropdown">
        <input type="checkbox" disabled :value="name">
        <div class="spline-dropdown-content">
          <p class="index-spline-options" v-for="freq in splineYearFreq" :key="freq" @click="toggleIndexSpline" :id="freq"> {{ freq }}yrs </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

        var errorFileIndices = ''
        var dataNamesArray = ['All Data', 'Median']
        for (let i = 0; i < this.formattedFileData.length; i++) {
          if (!this.formattedFileData[i]) {
            return
          }

          let header = this.formattedFileData[i][0]
          // check if file has header
          if (isNaN(parseFloat(header[0])) == false) {
            errorFileIndices += (i + 1 + ', ')
          } else {
            for (let j = 1; j < header.length; j++) {
              dataNamesArray.push(header[j])
            }
          }
        }

        if (errorFileIndices) {
          let errIndex = errorFileIndices.slice(0, -2)
          let alertText = (errIndex.length > 1) ?
              'Files ' + errIndex + ' require headers formatted as such: Year, name1, name2, ...' :
              'File ' + errIndex + ' requires a header formatted as such: Year, name1, name2, ...'
          alert(alertText)
          return false
        } else {
          return dataNamesArray
        }
      },
      dataObj: function () {

      },
    },
    methods: {
      // each checkbox's value is the data name
      colorChange(e) {
        // id = data name
        // value = color hex code
        console.log(e.target.id, e.target.value, 'color change')
      },
      toggleWidthPoints (e) {
        // value = data name
        console.log(e.target.value, 'points toggled')
      },
      toggleCheckbox (e) {
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

        return checkbox.value
      },
      toggleWidthSpline (e) {
        let dataName = this.toggleCheckbox(e)
        console.log(dataName, e.target.id, 'spline toggled')
        // send data to plotly
      },
      toggleIndexPoints (e) {
        // value = data name
        console.log(e.target.value, 'index toggled')
      },
      toggleIndexSpline (e) {
        let dataName = this.toggleCheckbox(e)
        console.log(dataName, e.target.id, 'spline toggled')
        // send data to plotly
      },
    },
  }

</script>

<style scoped>
  h2 {
    font-family: Sans-serif;
    color: #797979;
    margin: 0 10px;
  }

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
    margin: 0 5px;
    box-sizing: border-box;
  }

  input[type="checkbox"] {
    border: 2px solid #797979;
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
    margin-left: 10px;
  }

  .data-names {
    font-family: Sans-serif;
    font-weight: bold;
    color: #797979;
    width: 100px;
    height: 18px;
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
    margin: 0 5px;
  }

  .spline-dropdown:hover .spline-dropdown-content {
    display: block;
  }

  .spline-dropdown-content {
    display: none;
    margin-top: -22px;
    margin-left: -58px;
    position: absolute;
    background-color: #f6f6f6;
    border: 2px solid #797979;
    border-radius: 5px;
    z-index: 1;
  }

  .spline-dropdown-content p {
    display: block;
    padding: 2px;
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

</style>
