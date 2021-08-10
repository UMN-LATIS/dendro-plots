import { reactive } from 'vue'

const state = reactive({
  pastShownData: [],
  futureShownData: [],
  currentShownData: [],
})

const methods = {
  addPast: function (data) {
    state.pastShownData.push(data.slice())
  },
  addFuture: function (data) {
    state.futureShownData.push(data.slice())
  },
  undo: function () {
    let recentState = state.pastShownData[state.pastShownData.length - 1].slice()
    state.pastShownData.pop()
    this.addFuture(state.currentShownData)
    state.currentShownData = recentState

    console.log('current', state.currentShownData)
  },
  redo: function () {
    let recentState = state.futureShownData[state.futureShownData.length - 1].slice()
    state.futureShownData.pop()
    this.addPast(state.currentShownData)
    state.currentShownData = recentState

    console.log('current', state.currentShownData)
  },
  newCurrent: function (data) {
    state.futureShownData = []
    state.pastShownData.push(state.currentShownData.slice())
    state.currentShownData = data.slice()

    console.log('current', state.currentShownData)
  }
}

export default {
  state,
  methods
}
