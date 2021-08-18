<template>
  <div>
    <p> Timeseries </p>
    <div class="dropdown">
      <img style="margin-left: 105px;" src="../assets/info-icon.png">
      <div class="dropdown-content">
        <span> {{ infoText }} </span>
      </div>
    </div>
    <img src="../assets/sort-button.png" v-if="store.saved.loadSequence.length" :title="sortText[sortType]" @click="sort">
    <img src="../assets/undo-button.png" class="hide" :class="{ show: store.states.pastData.length }" title="Undo" @click="store.methods.undo()">
    <img src="../assets/redo-button.png" class="hide" :class="{ show: store.states.futureData.length }" title="Redo" @click="store.methods.redo()">
  </div>
</template>

<script>
  // undo redo emit events, data manager handles them

  export default {
    inject: ['store'],
    data() {
      return {
        infoText: 'text text text text text text text text text text text text',
        sortType: 0,
        sortText: ['Sort A -> Z', 'Sort Z -> A', 'Sort by load sequence']
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
        let currentCopy = JSON.parse(JSON.stringify(this.store.states.currentData))
        if (this.sortType == 0) {
          this.alphaNumeric(currentCopy, -1, 1)
        } else if (this.sortType == 1) {
          this.alphaNumeric(currentCopy, 1, -1)
        } else if (this.sortType == 2) {
          let arr = new Array()
          for (const id of this.store.saved.loadSequence) {
            const obj = currentCopy.find(o => o.id == id)
            arr.push(obj)
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
    display: inline;
    margin: 0;
  }

  img {
    width: 18px;
    height: 18px;
    margin: 0 8px;
  }

  .show {
    opacity: 1 !important;
    pointer-events: auto !important;
  }

  .show:hover {
    cursor: pointer;
  }

  .hide {
    opacity: 0;
    pointer-events: none;
  }

  .dropdown:hover .dropdown-content {
    display: block;
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
    margin-left: 110px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

</style>
