<template>
  <div class="individual-wrapper"
       v-for="(obj, index) in store.states.currentStates"
       :key="obj.id"
       @click="click($event, index)"
  >

    <Name :name="obj.name"
          :file="obj.file"
    />

    <Remove class="remove"
            :id="obj.id"
            @click="remove(index)"
    />

    <Popup class="popup"
           :id="obj.id"
           v-if="shownIndices.includes(index)" />
  </div>
</template>

<script>
  import Name from './DataComponents/Name.vue'
  import Remove from './DataComponents/Remove.vue'
  import Popup from './DataComponents/Popup.vue'

  export default {
    inject: ['store'],
    components: { Name, Remove, Popup },
    data() {
      return {
        shownIndices: [],
      }
    },
    methods: {
      click: function(e, i) {
        if (e.target.closest('.remove') || e.target.closest('.popup')) {
          return
        }

        let wrapper = document.getElementsByClassName('individual-wrapper')[i]
        wrapper.classList.contains('active') ? (wrapper.classList.remove('active'),
                                                this.shownIndices = this.shownIndices.filter(n => n != i))
                                             : (wrapper.classList.add('active'),
                                                this.shownIndices.push(i))
      },
      remove: function(i) {
        this.shownIndices = this.shownIndices.filter(n => n != i)
        console.log(this.shownIndices)
      },
    }
  }

</script>

<style scoped>
  .individual-wrapper {
    width: 100%;
    height: 20px;
    padding-left: 5px;
    margin: 0;
  }

  .individual-wrapper:hover {
    background-color: #d9d9d9;
  }

  .active {
    background-color: #bdbdbd !important;
  }

</style>
