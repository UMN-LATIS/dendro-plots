<template>
  <h2> Table of Contents: </h2>
  <div class="individual-data-wrapper" v-if="files && files.length" v-for="name in fileNames" :key="name">
    <div class="data-names">
      <p> {{ name }} </p>
    </div>
    <div class="data-options">
      <input type="color" @change="colorChange">
      <input type="checkbox" @change="toggleWidthPoints">
      <div class="spline-dropdown">
        <input type="checkbox" disabled>
        <div class="spline-dropdown-content">
          <p v-for="freq in splineYearFreq" :key="freq" @click="toggleWidthSpline" :id="freq"> {{ freq }}yrs </p>
        </div>
      </div>
      <input type="checkbox" @change="toggleIndexPoints">
      <div class="spline-dropdown">
        <input type="checkbox" disabled>
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
      colorChange(e) {
        console.log(e.target.value)
      },
      toggleWidthPoints (e) {
        console.log(e.target.checked)
      },
      toggleWidthSpline (e) {
        if (e.target.classList.contains('active')) {
          e.target.className = e.target.className.replace(' active', '')
        } else {
          e.target.className += ' active'
        }
      },
      toggleIndexPoints (e) {
        console.log(e.target.checked)
      },
      toggleIndexSpline (e) {
        if (e.target.classList.contains('active')) {
          e.target.className = e.target.className.replace(' active', '')
        } else {
          e.target.className += ' active'
        }
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
    background: #b5b5b5;
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
    background: #9e9e9e;
    color: #f6f6f6;
  }

  .spline-dropdown-content p.active {
    background: #797979;
    color: #f6f6f6;
  }

</style>
