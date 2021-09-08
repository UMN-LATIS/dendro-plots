<template>
  <select @change="onChange">
    <DropdownOptions v-for="obj in options"
                     :key="obj.value"
                     :id="id"
                     :name="obj.name"
                     :value="obj.value"
                     :dropdownProp="dropdownProp"
    />
  </select>
</template>

<script>
  import DropdownOptions from './DropdownOptions.vue'

  export default {
    inject: ['store'],
    props: ['id', 'options', 'dropdownProp'],
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

        if (this.id === this.store.cache.allID) {
          // all set
          this.store.methods.allAction(this.dropdownProp, val)
        } else if (this.id === this.store.cache.medianID) {
          this.store.methods.updateCache('states', this.id, this.dropdownProp, val)
        } else {
          // base core or uploaded sets
          this.store.methods.newCurrent(val, this.id, this.dropdownProp)
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
    width: 56px;
    border: 1px solid black;
    border-radius: 2px;
    position: absolute;
    margin-top: 2px;
    margin-bottom: 2px;
    cursor: pointer;
  }

</style>
