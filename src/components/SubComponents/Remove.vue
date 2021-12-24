<template>
  <div class="dropdown">
    <img src="../../assets/delete-button.png"
         @click="onClick"
    >
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
          // all set
          this.store.methods.newCurrent([])
        } else {
          // base core or uploaded sets
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
    display: inline-block;
    border: none;
  }

  .dropdown-content {
    display: none;
    font-weight: normal;
    font-family: Sans-serif;
    font-size: 12px;
    color: black;
    padding: 6px;
    margin: 0;
    position: absolute;
    margin-top: 20px;
    margin-left: -10px;
    background-color: #f6f6f6;
    border: 1px solid black;
    border-radius: 2px;
    z-index: 999999;
  }

  .dropdown:hover .dropdown-content {
    display: inline;
  }

</style>
