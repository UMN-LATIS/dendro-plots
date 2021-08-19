<template>
  <p :class="{ active: isActive }" @click="click"> {{ freq }}yrs </p>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'freq', 'storedFreq', 'freqProperty', 'activeBool', 'activeProperty'],
    data() {
      return {
        active: false,
      }
    },
    computed: {
      isActive: function() {
        if (this.activeBool && this.storedFreq == this.freq) {
          return true
        }
        return false
      }
    },
    methods: {
      click: function(e) {
        let active, newFreq
        if (this.storedFreq == this.freq) {
          active = false
          newFreq = 0
        } else {
          active = true
          newFreq = this.freq
        }
        this.store.methods.newCurrent(active, this.id, this.activeProperty)
        this.store.methods.modifyCurrent(newFreq, this.id, this.freqProperty)
      },
    }
  }
</script>

<style scoped>
  p {
    display: block;
    font-family: sans-serif;
    font-weight: normal;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    cursor: pointer;
  }

  p:hover {
    background: #b5b5b5;
    color: #f6f6f6;
  }

  p.active {
    background: #797979;
    color: #f6f6f6;
  }
</style>
