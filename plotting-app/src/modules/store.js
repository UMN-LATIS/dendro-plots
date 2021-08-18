import { reactive } from 'vue'
import { simpleSmoothingSpline } from 'simple-smoothing-spline'

/*
  States stored as objects. When current states changes, a Plotly trace is created & rendered.
  State attributes:
    * name: string
    * file: string
    * pointColor: string
    * widthSplineColor: string
    * indexSplineColor: string
    * widthPointsActive: boolean
    * widthSplineActive: boolean
    * widthSplineFreq: number
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

const saved = {
  splineCache: [],
  loadSequence: [],
}

const methods = {
  addSpline: function (freq) {

  },
  loadData: function (data) {
    for (const set of data) {
      let existingSet = states.currentData.find(obj => obj.name == set.name)
      if (existingSet) {
        let n = states.currentData.filter(obj => obj.name.split(' (')[0] == set.name).length
        set.name = set.name + ' (' + n + ')'
      }

      let newSet = new Object()
      let id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

      // default data values
      newSet.id = id
      newSet.name = set.name
      newSet.file = set.fileName
      newSet.pointColor = '#000000'
      newSet.widthSplineColor = ''
      newSet.indexSplineColor = ''
      newSet.widthPointsActive = false
      newSet.widthSplineActive = false
      newSet.widthSplineFreq = 0
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
  addTo: function (data, property) {
    states[property].push(data)
  },
  undo: function () {
    let recentState = states.pastData[states.pastData.length - 1]
    states.pastData.pop()
    this.addTo(states.currentData, 'futureData')
    states.currentData = recentState
  },
  redo: function () {
    let recentState = states.futureData[states.futureData.length - 1]
    states.futureData.pop()
    this.addTo(states.currentData, 'pastData')
    states.currentData = recentState
  },
  newCurrent: function (id, property, data) {
    states.futureData = []
    let currentCopy = JSON.parse(JSON.stringify(states.currentData))
    states.pastData.push(currentCopy)
    let currentSet = states.currentData.find(obj => obj.id == id)
    currentSet[property] = data
  }
}

export default {
  states,
  saved,
  methods
}
