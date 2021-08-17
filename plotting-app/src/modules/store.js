import { reactive } from 'vue'

const state = reactive({
  pastData: [],
  currentData: [],
  futureData: [],
  splineCache: [],
})

const methods = {
  addTo: function (data, property) {
    state[property].push(data)
  },
  undo: function () {
    let recentState = state.pastData[state.pastData.length - 1]
    state.pastData.pop()
    this.addTo(state.currentData, property_future)
    state.currentData = recentState
  },
  redo: function () {
    let recentState = state.futureData[state.futureData.length - 1]
    state.futureData.pop()
    this.addTo(state.currentData, pastData)
    state.currentData = recentState
  },
  newCurrent: function (data, property_past, property_current, property_future) {
    state.futureData = []
    state.pastData.push(state.currentData)
    state.currentData = data
  }
}

export default {
  state,
  methods
}
