<template>
  <div class="dropdown">
    <img src="../../assets/sort-button.png"
         v-if="store.cache.loadSequence.length > 1"
         @click="onClick"
    >
    <div class="dropdown-content">
      <p class="info"> {{ sortText[sortType] }} </p>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    data() {
      return {
        sortType: 0,
        sortText: ['Sorting by load sequence.', 'Sorting A to Z.', 'Sorting Z to A.'],
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
            0 = A -> Z
            1 = Z -> A
            2 = load order
        */
        let currentCopy = JSON.parse(JSON.stringify(this.store.states.current))
        switch (this.sortType) {
          case 0:
            this.alphaNumeric(currentCopy, -1, 1)
            break;
          case 1:
            this.alphaNumeric(currentCopy, 1, -1)
            break;
          case 2:
            let arr = new Array()
            for (const id of this.store.cache.loadSequence) {
              const obj = currentCopy.find(o => o.id == id)
              if (obj) {
                arr.push(obj)
              }
            }
            currentCopy = arr
            break;
        }
        this.store.methods.newCurrent(currentCopy)

        this.sortType++
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
    cursor: pointer;
  }

  .info {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: sans-serif;
    font-size: 12px;
    color: black;
    width: max-content;
  }

  .dropdown {
    height: 20px;
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: 22px;
    margin-left: -20px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
    display: inline;
  }

</style>
