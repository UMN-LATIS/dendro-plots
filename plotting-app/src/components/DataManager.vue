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
                :activeProperty="'widthSplineActive'"
                :freqProperty="'widthSplineFreq'"
      />

      <Toggle :id="obj.id"
              :toggleProperty="'indexPointsActive'"
              :toggleChecked="obj.indexPointsActive"
              :toggleDisable="!obj.widthSplineActive"
      />

      <Dropdown :id="obj.id"
                :activeProperty="'indexSplineActive'"
                :freqProperty="'indexSplineFreq'"
      />

      <ColorSwatch :id="obj.id" />

      <Remove :id="obj.id" />
      
    </div>
  </div>
</template>

<script>
  import Name from './DataComponents/Name.vue'
  import Toggle from './DataComponents/Toggle.vue'
  import Dropdown from './DataComponents/Dropdown.vue'
  import ColorSwatch from './DataComponents/ColorSwatch.vue'
  import Remove from './DataComponents/Remove.vue'

  export default {
    inject: ['store'],
    components: { Name, Toggle, Dropdown, ColorSwatch, Remove },
    data() {
      return {
      }
    },
    methods: {
      test(i) {
        console.log('test')
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
