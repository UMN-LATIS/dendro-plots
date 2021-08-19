import { reactive } from 'vue'
import { simpleSmoothingSpline } from 'simple-smoothing-spline'

/*
  States stored as objects. When current states changes, a Plotly trace is created & rendered.
  State attributes:
    * name: string
    * file: string
    * color: string
    * colorState: boolean
    * dataPointsActive: boolean
    * dataSplineActive: boolean
    * dataSplineFreq: number
    * indexPointsActive: boolean
    * indexSplineActive: boolean
    * indexSplineFreq: number
    * x: array
    * y: array
*/

const states = reactive({
  pastStates: [],
  currentStates: [],
  futureStates: [],
})

const cache = reactive({
  splineCache: [],
  dataCache: [],
  indexCache: [],
  loadSequence: [],
})

const methods = {
  checkSpline: function(id, freq) {
  },
  newSpline: function(id, freq) {
  },
  loadData: function(data) {
    this.saveCurrent()

    for (const set of data) {
      let existingSet = states.currentStates.find(obj => obj.name == set.name)
      if (existingSet) {
        let n = states.currentStates.filter(obj => obj.name.split(' (')[0] == set.name).length
        set.name = set.name + ' (' + n + ')'
      }

      let newState = new Object()
      // set IDs are random 5 digit numbers
      let id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

      // default state values
      newState.id = id
      newState.name = set.name
      newState.file = set.fileName
      newState.color = '#000000'
      newState.colorState = true
      newState.dataPointsActive = false
      newState.dataSplineActive = false
      newState.dataSplineFreq = 0
      newState.indexPointsActive = false
      newState.indexSplineActive = false
      newState.indexSplineFreq = 0
      newState.splines = []
      states.currentStates.push(newState)

      // store known data
      let newData = new Object()
      newData.id
      newData.x = set.x
      newData.y = set.y
      cache.dataCache

      // establish default load sequence
      cache.loadSequence.push(newState.id)
    }
  },
  addTo: function(data, property) {
    states[property].push(data)
  },
  undo: function() {
    let recentState = states.pastStates[states.pastStates.length - 1]
    states.pastStates.pop()
    this.addTo(states.currentStates, 'futureStates')
    states.currentStates = recentState
  },
  redo: function() {
    let recentState = states.futureStates[states.futureStates.length - 1]
    states.futureStates.pop()
    this.addTo(states.currentStates, 'pastStates')
    states.currentStates = recentState
  },
  saveCurrent: function() {
    states.futureStates = []
    let currentCopy = JSON.parse(JSON.stringify(states.currentStates))
    states.pastStates.push(currentCopy)
  },
  newCurrent: function(data, id, property) {
    this.saveCurrent()
    if (id && property) {
      let currentSet = states.currentStates.find(obj => obj.id == id)
      currentSet[property] = data
    } else {
      states.currentStates = data
    }
  },
  modifyCurrent: function(data, id, property) {
    let currentSet = states.currentStates.find(obj => obj.id == id)
    currentSet[property] = data
  },
  removeCurrent: function(id) {
    this.saveCurrent()
    let setIndex = states.currentStates.findIndex(obj => obj.id == id)
    states.currentStates.splice(setIndex, 1)
  }
}

export default {
  states,
  cache,
  methods
}
