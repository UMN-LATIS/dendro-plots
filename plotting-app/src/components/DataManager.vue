<template>
  <div class="individual-data-wrapper" v-for="obj in store.states.currentData" :key="obj.id">
    <Name :name="obj.name"
          :file="obj.file"
    />

    <div class="data-options">
      <Toggle :id="obj.id"
              :toggleProperty="'widthPointsActive'"
              :toggleChecked="obj.widthPointsActive"
              :toggleDisable="false"
      />

      <Dropdown :id="obj.id"
                :pointColor="obj.pointColor"
                :colorProperty="'widthSplineColor'"
                :activeProperty="'widthSplineActive'"
                :freqProperty="'widthSplineFreq'"
      />

      <Toggle :id="obj.id"
              :toggleProperty="'indexPointsActive'"
              :toggleChecked="obj.indexPointsActive"
              :toggleDisable="!obj.widthSplineActive"
      />

      <Dropdown :id="obj.id"
                :pointColor="obj.pointColor"
                :colorProperty="'indexSplineColor'"
                :activeProperty="'indexSplineActive'"
                :freqProperty="'indexSplineFreq'"
      />

      <ColorSwatch :id="obj.id" />

      <div class="delete-div" @click="deleteSet(name)">
        <img src="../assets/delete-button.png" class="delete-img" title="Remove series">
      </div>
    </div>
  </div>
</template>

<script>
  import Name from './DataComponents/Name.vue'
  import Toggle from './DataComponents/Toggle.vue'
  import Dropdown from './DataComponents/Dropdown.vue'
  import ColorSwatch from './DataComponents/ColorSwatch.vue'

  export default {
    inject: ['store'],
    components: { Name, Toggle, Dropdown, ColorSwatch },
    data() {
      return {
        splineYearFreq: [20, 30, 50, 100, 200],
        splineFunctions: [this.toggleWidthSpline, this.toggleIndexPoints, this.toggleIndexSpline],
        splineCache: [],
      }
    },
    methods: {
      test(i) {
        console.log('test')
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
  .individual-data-wrapper {
    width: 100%;
  }

  .data-options {
    width: 60%;
    height: 18px;
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
