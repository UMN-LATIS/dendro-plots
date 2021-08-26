<template>
  <div>
    <p v-if="store.cache.loadSequence.length"> Data </p>
    <div class="dropdown">
      <img style="margin-left: 75px;" src="../assets/sort-button.png" class="hide" :class="{ show: store.cache.loadSequence.length > 1 }" @click="sort">
      <div class="dropdown-content">
        <span> {{ sortText[sortType] }} </span>
      </div>
    </div>
    <div class="dropdown" v-if="store.cache.loadSequence.length" v-for="(text, index) in infoText" :key="index">
      <img class="info-icons" :class="infoID[index]" :src="infoPNG[index]">
      <div class="dropdown-content">
        <span> {{ text }} </span>
      </div>
    </div>
  </div>
</template>

<script>
  // undo redo emit events, data manager handles them

  export default {
    inject: ['store'],
    data() {
      return {
        infoID: ['first', 'second', 'third', 'fourth', 'fifth'],
        infoPNG: [require('../assets/width-toggle-icon.png'),
                  require('../assets/width-spline-icon.png'),
                  require('../assets/index-toggle-icon.png'),
                  require('../assets/index-spline-icon.png'),
                  require('../assets/color-icon.png')],
        infoText: ['Show raw data',
                   'Spline for detrending',
                   'Show index of data',
                   'Spline for index',
                   'Change line color'],
        sortType: 0,
        sortText: ['Sort A -> Z', 'Sort Z -> A', 'Sort by load sequence'],
        showAdjustment: true,
      }
    },
    methods: {
      alphaNumeric: function(arr, returnA, returnB) {
        return arr.sort((objA, objB) => {
                let nameA = objA.name.toUpperCase()
                let nameB = objB.name.toUpperCase()
                if (nameA < nameB) {
                  return returnA;
                } else if (nameA > nameB) {
                  return returnB;
                }
                return 0;
              })
      },
      sort: function() {
        /*
          Sorting type code:
            1 = A -> Z
            2 = Z -> A
            3 = load order
        */
        let currentCopy = JSON.parse(JSON.stringify(this.store.states.currentStates))
        if (this.sortType == 0) {
          this.alphaNumeric(currentCopy, -1, 1)
        } else if (this.sortType == 1) {
          this.alphaNumeric(currentCopy, 1, -1)
        } else if (this.sortType == 2) {
          let arr = new Array()
          for (const id of this.store.cache.loadSequence) {
            const obj = currentCopy.find(o => o.id == id)
            if (obj) {
              arr.push(obj)
            }
          }
          currentCopy = arr
        }
        this.store.methods.newCurrent(currentCopy)

        this.sortType ++
        if (this.sortType > 2) {
          this.sortType = 0
        }
      }
    },
  }
</script>

<style scoped>
  div {
    margin: 0;
    display: inline;
  }

  p {
    font-family: Sans-serif;
    font-weight: bold;
    font-size: 18px;
    color: #797979;
    height: 18px;
    position: absolute;
    display: block;
    margin: 0;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 6px;
    cursor: pointer;
  }

  .info-icons {
    cursor: help;
  }

  .show {
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }

  .dropdown, .show:hover {
    cursor: normal;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
  }

  .dropdown-content {
    display: none;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -16px;
    margin-top: 22px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .first {
    margin-left: 5px;
  }

</style>
