<template>
  <div class="dropdown">
    <p class="name"
       :style="{ color: ofColor }"
    >
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
        if (this.store.cache.spagActive && this.id > 9999) { // exclude all & medians
          return this.store.cache.spagColor
        }

        if (this.store.cache.medianIDs.includes(this.id)) {
          return '#000000'
        }

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
    width: 96px;
    height: 16px;
    display: inline;
  }

  .name {
    display: inline-block;
    width: 94px;
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
    margin-left: -98px;
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
