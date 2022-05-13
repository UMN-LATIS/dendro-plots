<!--
  Purpose:
    Creates name block and related hovertext for each loaded dataset.

  Props:
    name:
      Name of dataset to be shown.
    file:
      Name of file where dataset located.
    id:
      ID of dataset. Allows for deciding color of name block.

  Computed:
    ofColor:
      Returns hex code for name block color. Decides HTML p-tag color. 

  Methods:
-->

<template>
  <div class="dropdown">
    <p class="name"
       :style="{ color: ofColor }">
      {{ name }}
    </p>
    <div class="dropdown-content">
      <p class="info"> {{ name + ' from ' + file }} </p>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['store'],
    props: ['name', 'file', 'id'],
    computed: {
      ofColor: function() {
        // If spaghetti plot option active, all names (except medians) given
        // same color.
        if (this.store.cache.spagActive && this.id > 9999) {
          return this.store.cache.spagColor
        }

        // ID dictates where to search for information. IDs within [99, 9999]
        // are found in undo/redo save states (store.states.current) while
        // IDs out of that bound (medians and base datasets from DE) are found
        // in cache save states (store.cache.states).
        let states = (this.store.cache.medianIDs.includes(this.id)) ? this.store.cache.states : this.store.states.current
        let set = states.find(o => o.id == this.id)
        if (set) {
          return set.color
        }

        return '#000000'
      }
    }
  }
</script>

<style scoped>
  div {
    width: max-content;
    height: 16px;
    display: inline;
  }

  .name {
    display: inline-block;
    width: 160px;
    height: 18px;
    margin: 0;
    margin-top: 3px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-family: Sans-serif;
    font-weight: normal;
    font-size: 14px;
    color: black;
  }

  .info {
    margin: 0;
    margin-top: 2px;
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
    transition: z-index 0s, opacity 0s;
    transition-delay: 1s;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: -30px;
    margin-left: -164px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 0;
    width: max-content;
  }

  .dropdown:hover .dropdown-content {
    visibility: visible;
    opacity: 1;
    display: inline;
    z-index: 99999;
  }

  .dropdown-content:hover {
    display: none !important;
  }

</style>
