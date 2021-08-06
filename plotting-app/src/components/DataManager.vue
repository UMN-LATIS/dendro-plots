<template>
  <h2> Table of Contents: </h2>
  <div class="individual-data-wrapper" v-if="files && files.length" v-for="name in fileNames" :key="name">
    <div class="data-names">
      <p> {{ name }} </p>
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
          <p v-for="freq in splineYearFreq" :key="freq" @click="toggleIndexSpline" :id="freq"> {{ freq }}yrs </p>
        </div>
      </div>
    </div>
  </div>
  <p style="margin: 0px 10px;" v-else> No Data to Display </p>
</template>

<script>
  export default {
    props: ['files', 'formattedFiles'],
    data() {
      return {
        splineYearFreq: [20, 30, 50, 100, 200],
      }
    },
    computed: {
      fileNames: function () {
        let fileNamesArray = ['All Data', 'Median']
        for (let file of this.files) {
          let formattedName = file.name.split('.')[0]
          fileNamesArray.push(formattedName)
        }
        return fileNamesArray
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
          let options = document.getElementsByClassName('width-spline-options')
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
    margin: 0 10px;
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
    width: calc(40% - 10px);
    height: 18px;
    margin-right: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .data-options {
    width: calc(60% - 10px);
    height: 18px;
  }

  .spline-dropdown {
    position: relative;
    display: inline-block;
  }

  .spline-dropdown:hover .spline-dropdown-content {
    display: block;
  }

  .spline-dropdown-content {
    display: none;
    margin-top: -22px;
    margin-left: 30px;
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
