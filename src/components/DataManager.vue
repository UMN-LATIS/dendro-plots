<template>
  <div class="data-entry-wrapper"
       v-for="obj in pairs"
       :key="obj.id"
       :class="{ active: obj.active }"
       :id="obj.id"
       @click="click($event, obj.id, obj.active)"
  >

    <Name :name="obj.name"
          :file="obj.file"
    />

    <Remove class="remove"
            :id="obj.id"
    />

    <Modal class="modal"
           :id="obj.id"
           :top="obj.top"
           v-if="obj.active && !obj.outOfBounds"
    />
  </div>
</template>

<script>
  import Name from './SubComponents/Name.vue'
  import Remove from './SubComponents/Remove.vue'
  import Modal from './SubComponents/Modal.vue'

  export default {
    inject: ['store'],
    props: ['useCache'],
    components: { Name, Remove, Modal },
    computed: {
      pairs: function() {
        // combine state & cache info so it can be used as props
        let states = (this.useCache) ? this.store.cache.states : this.store.states.current
        return states.map(stateObj => {
          let modalObj = this.store.cache.modals.find(o => o.id == stateObj.id)
          let pairObj = new Object()
          pairObj.id = stateObj.id
          pairObj.name = stateObj.name
          pairObj.file = stateObj.file
          pairObj.active = modalObj.active
          pairObj.top = modalObj.top
          pairObj.outOfBounds = modalObj.outOfBounds
          return pairObj
        })
      }
    },
    methods: {
      click: function(e, id, active) {
        if (e.target.closest('.remove') || e.target.closest('.modal')) {
          return
        }
        this.store.methods.updateCache('modals', id, 'active', !active)
      },
      onScroll: function() {
        let dataEntries = document.getElementsByClassName('data-entry-wrapper')
        for (const e of dataEntries) {
          let modalObj = this.store.cache.modals.find(o => o.id == e.id)
          if (e.getBoundingClientRect().top > 114 || e.id < 999) {
            modalObj.top = e.getBoundingClientRect().top - 1
            modalObj.outOfBounds = false
          } else {
            modalObj.outOfBounds = true
          }
        }
      },
    },
    updated() {
      this.onScroll()

      document.getElementById('data-management').addEventListener('scroll', this.onScroll)
    },
    beforeDestroy() {
      document.getElementById('data-management').removeEventListener('scroll', this.onScroll)
    },
  }

</script>

<style scoped>
  .data-entry-wrapper {
    width: 100%;
    height: 20px;
    padding: 0;
    padding-left: 5px;
    margin: 0;
  }

  .data-entry-wrapper:hover {
    background-color: #d9d9d9;
  }

  .active {
    background-color: #bdbdbd !important;
  }

  .remove {
    float: right;
  }

</style>
