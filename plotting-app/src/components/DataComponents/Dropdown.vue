<template>
  <div class="dropdown">
    <input type="color" :disabled="isDisabled" :value="isValue" @change="change">
    <div class="dropdown-content">
      <DropdownOptions v-for="freq in frequencies" :key="freq"
                       :id="id"
                       :freq="freq"
                       :freqProperty="freqProperty"
                       :activeProperty="activeProperty"
      />
    </div>
  </div>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'pointColor', 'colorProperty', 'activeProperty', 'freqProperty'],
    components: { DropdownOptions },
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
            obj[this.colorProperty] = this.shadeColor(this.pointColor, -50)
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
</style>
