<template>
  <select @change="onChange">
    <DropdownOptions v-for="obj in options"
                     :key="obj.value"
                     :id="id"
                     :name="optionModifer + obj.name"
                     :value="obj.value"
                     :mainProp="mainProp"
                     :disabled="isDisabled"
    />
  </select>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'options', 'optionModifer', 'mainProp', 'actions', 'disableProp'],
    components: { DropdownOptions },
    methods: {
      onChange: function(e) {
        let val = e.target.value
        let boolCheck = (val === 'false')
        if (boolCheck) {
          val = false
        } else if (parseInt(val)) {
          val = parseInt(val)
        }

        for (let prop of this.actions) {
          if (this.id === this.store.cache.allID) {
            this.store.methods.allAction(prop, val)
          } else if (this.store.cache.medianIDs.includes(this.id)) {
            this.store.methods.updateCache('states', this.id, prop, val)
          } else {
            this.store.methods.newCurrent(val, this.id, prop)
          }
        }
      }
    },
    computed: {
      isDisabled: function() {
        if (!this.disableProp) {
          return this.disableProp
        }

        if (this.id === this.store.cache.allID) {
          return !this.store.methods.checkAll(this.disableProp)
        } else {
          let states = (this.store.cache.medianIDs.includes(this.id)) ? this.store.cache.states : this.store.states.current
          let set = states.find(o => o.id == this.id)
          if (set) return !set[this.disableProp]
        }
      }
    }
  }
</script>

<style scoped>
  @-moz-document url-prefix() {
    select {
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }

  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    -ms-appearance: none;

    font-family: Sans-serif;
    font-weight: normal;
    font-size: 11px;
    color: black;
    height: 16px;
    border: 1px solid black;
    border-radius: 4px;
    padding-left: 4px;
    padding-right: 4px;
    position: absolute;
    margin-top: 2px;
    margin-bottom: 2px;
    cursor: pointer;
    z-index: 0;
  }

  select::-ms-expand {
    display: none;
  }

</style>
