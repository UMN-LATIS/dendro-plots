<template>
  <select @change="onChange">
    <DropdownOptions v-for="obj in options"
                     :key="obj.value"
                     :id="id"
                     :name="obj.name + optionModifer"
                     :value="obj.value"
                     :mainProp="mainProp"
    />
  </select>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'options', 'optionModifer', 'mainProp', 'actions'],
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
    }
  }
</script>

<style scoped>
  select {
    font-family: Sans-serif;
    font-weight: normal;
    font-size: 12px;
    color: black;
    height: 16px;
    border: 1px solid black;
    border-radius: 2px;
    position: absolute;
    margin-top: 2px;
    margin-bottom: 2px;
    cursor: pointer;
  }

</style>
