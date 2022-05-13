<!--
  Purpose:
    Creates icon which when clicked removes dataset from use.

  Props:
    id:
      ID of dataset. Allows removal of all datatset traces.

  Computed:

  Methods:
    onClick:
      Removes dataset from current save state (can be undone.) Specical case
      when activating this on "all data" or medians.
-->

<template>
  <div class="dropdown">
    <img src="../../assets/delete-button.png"
         @click="onClick">
    <div class="dropdown-content">
      <p class="info"
         v-for="blurb in info"
         :key="blurb"> {{ blurb }}
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['id'],
    data: function () {
      return {
        info: ['Remove series'],
      }
    },
    methods: {
      onClick: function() {
        if (this.id === this.store.cache.allID) {
          // Do not remove base sets when all datasets removed.
          let baseSets = this.store.states.current.filter(o => o.id < 99)
          this.store.methods.newCurrent(baseSets)
        } else if (this.store.cache.medianIDs.includes(this.id)) {
          // Do not remove median. Simply turn it off.
          this.store.methods.updateCache('states', this.id, 'rawPointsActive', false)
        } else {
          // Remove item from table of contents.
          this.store.methods.removeCurrent(this.id)
        }
      }
    }
  }
</script>

<style scoped>
  div {
    display: inline;
  }

  img {
    cursor: pointer;
    width: 20px;
    height: 20px;
    margin: 0;
    margin-right: 5px;
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
    margin-top: -30px;
    margin-left: -22px;
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

  .dropdown-content:hover {
    display: none !important;
  }

</style>
