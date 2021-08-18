<template>
  <div class="dropdown">
    <input type="color" :disabled="isDisabled" :value="isValue" @change="change">
    <div class="dropdown-content">
      <p v-for="freq in frequencies" :key="freq" :class="{ active: isActive(freq) }" :data-freq="freq" @click="click"> {{ freq }}yrs </p>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'pointColor', 'colorProperty', 'activeProperty', 'freqProperty'],
    data() {
      return {
        frequencies: [20, 30, 50, 100, 200],
        userSetSplineColor: '',
      }
    },
    computed: {
      isValue: function() {
        for (const obj of this.store.states.currentData) {
          if (obj.id == this.id && obj[this.colorProperty]) {
            this.userSetSplineColor = ''
            return obj[this.colorProperty]
          }
        }
        return '#ffffff'
      },
      isDisabled: function() {
        for (const obj of this.store.states.currentData) {
          if (obj.id == this.id && obj[this.activeProperty]) {
            return false
          }
        }
        return true
      },
    },
    methods: {
      isActive: function(freq) {
        for (const obj of this.store.states.currentData) {
          if (obj.id == this.id && obj[this.freqProperty] == freq) {
            return true
          }
        }
        return false
      },
      shadeColor: function(color, percent) {
        var r = parseInt(color.substring(1,3),16)
        var g = parseInt(color.substring(3,5),16)
        var b = parseInt(color.substring(5,7),16)

        r = parseInt(r * (100 + percent) / 100)
        g = parseInt(g * (100 + percent) / 100)
        b = parseInt(b * (100 + percent) / 100)

        r = (r<255)?r:255
        g = (g<255)?g:255
        b = (b<255)?b:255

        var rr = ((r.toString(16).length==1)?"0"+r.toString(16):r.toString(16))
        var gg = ((g.toString(16).length==1)?"0"+g.toString(16):g.toString(16))
        var bb = ((b.toString(16).length==1)?"0"+b.toString(16):b.toString(16))

        return "#"+rr+gg+bb
      },
      change(e) {
        this.userSetSplineColor = e.target.value
        this.store.methods.newCurrent(this.id, this.colorProperty, e.target.value)
      },
      click: function(e) {
        var activate = (e.target.classList.contains('active')) ? false : true

        // deselect all options
        let activeOptions = e.target.parentElement.getElementsByClassName('active')
        for (const pbtn of activeOptions) {
          pbtn.className = pbtn.className.replace(' active', '')
          let swatch = pbtn.parentElement.previousElementSibling
          swatch.disabled = true
          swatch.value = '#ffffff'
        }

        // select clicked option if not previously active
        // save spline frequency
        if (activate) {
          this.store.states.currentData.find(obj => obj.id = this.id)[this.freqProperty] = parseInt(e.target.dataset.freq)
        } else {
          this.store.states.currentData.find(obj => obj.id = this.id)[this.freqProperty] = 0
        }
        this.store.methods.newCurrent(this.id, this.activeProperty, activate)

        if (activate) {
          let pbtn = e.target
          let swatch = e.target.parentElement.previousElementSibling
          pbtn.className += ' active'
          swatch.disabled = false
          if (!this.userSetSplineColor) {
            swatch.value = this.shadeColor(this.pointColor, -50)
          } else {
            swatch.value = this.userSetSplineColor
          }
          this.store.methods.newCurrent(this.id, this.colorProperty, swatch.value)
        }
      },
    }
  }
</script>

<style scoped>
  input[type="color"] {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 1px solid #797979;
    border-radius: 5px;
    margin: 0;
    margin-right: 16px;
    box-sizing: border-box;
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

  .dropdown {
    position: relative;
    display: inline-block;
    margin: 0;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    margin-left: 10px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 0;
    z-index: 999999;
  }

  .dropdown-content p {
    display: block;
    font-weight: normal;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
  }

  .dropdown-content p:hover {
    background: #b5b5b5;
    color: #f6f6f6;
  }

  .dropdown-content p.active {
    background: #797979;
    color: #f6f6f6;
  }
</style>
