import { reactive } from 'vue'

/*
  States stored as objects. When current state changes, a Plotly trace is created & rendered.
  State attributes:
    * name: string
    * file: string
    * color: string
    * widthActive: boolean
    * widthSplineFreqActive: number
    * indexActive: boolean
    * indexSplineFreqActive: number
    * x: array
    * y: array
    * splines: array of objects { freq: number, y: array }
*/

const state = reactive({
  loadSequence: [],
  pastData: [],
  currentData: [],
  futureData: [],
})

const methods = {
  loadData: function (data) {
    for (const set of data) {
      let existingSet = state.currentData.find(obj => obj.name == set.name)
      if (existingSet) {
        let n = state.currentData.filter(obj => obj.name.split(' (')[0] == set.name).length
        set.name = set.name + ' (' + n + ')'
      }

      let newSet = new Object()
      let id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

      // default data values
      newSet.id = id
      newSet.name = set.name
      newSet.file = set.fileName
      newSet.color = '#000000'
      newSet.widthActive = false
      newSet.widthSplineFreqActive = 0
      newSet.indexActive = false
      newSet.indexSplineFreqActive = 0
      newSet.x = set.x
      newSet.y = set.y
      newSet.splines = []

      state.currentData.push(newSet)

      // establish default load sequence
      state.loadSequence.push(newSet.id)
    }
  },
  addTo: function (data, property) {
    state[property].push(data)
  },
  undo: function () {
    let recentState = state.pastData[state.pastData.length - 1]
    state.pastData.pop()
    this.addTo(state.currentData, 'futureData')
    state.currentData = recentState
  },
  redo: function () {
    let recentState = state.futureData[state.futureData.length - 1]
    state.futureData.pop()
    this.addTo(state.currentData, 'pastData')
    state.currentData = recentState
  },
  newCurrent: function (id, property, data) {
    state.futureData = []
    let currentCopy = JSON.parse(JSON.stringify(state.currentData))
    state.pastData.push(currentCopy)
    let currentSet = state.currentData.find(obj => obj.id == id)
    currentSet[property] = data
  }
}

export default {
  state,
  methods
}
