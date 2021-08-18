<template>
  <p :class="{ active: isActive }" @click="click"> {{ freq }}yrs </p>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id', 'freq', 'freqProperty', 'activeProperty'],
    data() {
      return {
        active: false,
      }
    },
    computed: {
      isActive: function() {
        const obj = this.store.states.currentData.find(o => o.id == this.id)
        if (obj && obj[this.activeProperty] && obj[this.freqProperty] == this.freq) {
          return true
        }
        return false
      }
    },
    methods: {
      click: function(e) {
        let currentFreq = this.store.states.currentData.find(obj => obj.id = this.id)[this.freqProperty]
        let active, newFreq
        if (currentFreq == this.freq) {
          active = false
          newFreq = 0
        } else {
          active = true
          newFreq = this.freq
        }
        this.store.methods.newCurrent(this.id, this.activeProperty, active)
        this.store.methods.modifyCurrent(this.id, this.freqProperty, newFreq)
      },
    }
  }
</script>

<style scoped>
  p {
    display: block;
    font-weight: normal;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
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
