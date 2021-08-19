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
  pastData: [],
  currentData: [],
  futureData: [],
})

const saved = reactive({
  splineCache: [],
  loadSequence: [],
})

const methods = {
  // TODO: adding & checking spline functions
  addSpline: function(freq) {
  },
  loadData: function(data) {
    this.saveCurrent()

    for (const set of data) {
      let existingSet = states.currentData.find(obj => obj.name == set.name)
      if (existingSet) {
        let n = states.currentData.filter(obj => obj.name.split(' (')[0] == set.name).length
        set.name = set.name + ' (' + n + ')'
      }

      let newSet = new Object()
      // set IDs are random 5 digit numbers
      let id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

      // default data values
      newSet.id = id
      newSet.name = set.name
      newSet.file = set.fileName
      newSet.color = '#000000'
      newSet.colorState = true
      newSet.dataPointsActive = false
      newSet.dataSplineActive = false
      newSet.dataSplineFreq = 0
      newSet.indexPointsActive = false
      newSet.indexSplineActive = false
      newSet.indexSplineFreq = 0
      newSet.x = set.x
      newSet.y = set.y
      newSet.splines = []

      states.currentData.push(newSet)

      // establish default load sequence
      saved.loadSequence.push(newSet.id)
    }
  },
  addTo: function(data, property) {
    states[property].push(data)
  },
  undo: function() {
    let recentState = states.pastData[states.pastData.length - 1]
    states.pastData.pop()
    this.addTo(states.currentData, 'futureData')
    states.currentData = recentState
  },
  redo: function() {
    let recentState = states.futureData[states.futureData.length - 1]
    states.futureData.pop()
    this.addTo(states.currentData, 'pastData')
    states.currentData = recentState
  },
  saveCurrent: function() {
    states.futureData = []
    let currentCopy = JSON.parse(JSON.stringify(states.currentData))
    states.pastData.push(currentCopy)
  },
  newCurrent: function(data, id, property) {
    this.saveCurrent()
    if (id && property) {
      let currentSet = states.currentData.find(obj => obj.id == id)
      currentSet[property] = data
    } else {
      states.currentData = data
    }
  },
  modifyCurrent: function(data, id, property) {
    let currentSet = states.currentData.find(obj => obj.id == id)
    currentSet[property] = data
  },
  removeCurrent: function(id) {
    this.saveCurrent()
    let setIndex = states.currentData.findIndex(obj => obj.id == id)
    states.currentData.splice(setIndex, 1)
  }
}

export default {
  states,
  saved,
  methods
}
