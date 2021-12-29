<template>
  <div class="dropdown">
    <img src="../../assets/sort-button.png"
         v-if="store.cache.loadSequence.length > 1"
         @click="onClick">
    <div class="dropdown-content">
      <span> {{ sortText[sortType] }} </span>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    data() {
      return {
        sortType: 0,
        sortText: ['Sorting by load sequence', 'Sorting A -> Z', 'Sorting Z -> A'],
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
      onClick: function() {
        /*
          Sorting type code:
            1 = A -> Z
            2 = Z -> A
            3 = load order
        */
        let currentCopy = JSON.parse(JSON.stringify(this.store.states.current))
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
  img {
    width: 18px;
    height: 18px;
    margin-bottom: -2px;
  }

  .dropdown, .show:hover {
    cursor: pointer;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
    visibility: visible;
    opacity: 1;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 1s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-left: -10px;
    margin-top: 22px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }
</style>
