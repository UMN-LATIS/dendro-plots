import { reactive } from 'vue'

const state = reactive({
  pastShownData: [],
  futureShownData: [],
  currentShownData: [],
  dataCount: 0,
  splineCount: 0,
})

const methods = {
  addPast: function (data) {
    state.pastShownData.push(data.slice())
  },
  addFuture: function (data) {
    state.futureShownData.push(data.slice())
  },
  checkCount: function(data) {
    state.dataCount = 0
    state.splineCount = 0
    for (let obj of data) {
      if (obj.spline) {
        state.splineCount++
      } else {
        state.dataCount++
      }
    }
  },
  undo: function () {
    let recentState = state.pastShownData[state.pastShownData.length - 1].slice()
    state.pastShownData.pop()
    this.addFuture(state.currentShownData)
    state.currentShownData = recentState
    this.checkCount(state.currentShownData)
  },
  redo: function () {
    let recentState = state.futureShownData[state.futureShownData.length - 1].slice()
    state.futureShownData.pop()
    this.addPast(state.currentShownData)
    state.currentShownData = recentState
    this.checkCount(state.currentShownData)
  },
  newCurrent: function (data) {
    state.futureShownData = []
    state.pastShownData.push(state.currentShownData.slice())
    state.currentShownData = data.slice()
    this.checkCount(state.currentShownData)
  }
}

export default {
  state,
  methods
}
