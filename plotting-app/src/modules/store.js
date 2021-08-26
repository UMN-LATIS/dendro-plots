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
*/

const states = reactive({
  pastStates: [],
  currentStates: [],
  futureStates: [],
})

/*
  caches are an array of objects which do not change when undo/redo triggered
    * splineCache: [
                    {
                      id: 12345,
                      20: {
                            x: [...],
                            y: [...]
                          },
                      30: {...},
                      ...
                    },
                    ...
                  ]
    * dataCache: [
                  {
                    id: 12345,
                    x: [...],
                    y: [...],
                  },
                  ...
                ]
    * indexCache: [
                  {
                    id: 12345,
                    x: [...],
                    y: [...],
                  },
                  ...
                ]
*/

const cache = reactive({
  splineCache: [],
  dataCache: [],
  indexCache: [],
  loadSequence: [],
})

const methods = {
  addSpline: function(id, freq, data) {
    let splineObj = cache.splineCache.find(obj => obj.id == id)
    if (splineObj) {
      splineObj[freq] = data
    } else {
      splineObj = new Object()
      splineObj.id = id
      splineObj[freq] = data
      cache.splineCache.push(splineObj)
    }
  },
  getSpline: function(id, freq) {
    let spline = this.checkSplines(id, freq)
    if (!spline) {
      spline = this.newSpline(id, freq)
    }
    return spline
  },
  checkSplines: function(id, freq) {
    let splineObj = cache.splineCache.find(obj => obj.id == id)
    if (splineObj) {
      let splinePts = splineObj[freq]
      if (splinePts) {
        return splinePts
      }
    }
    return undefined
  },
  newSpline: function(id, freq) {
    // convert data to spline format
    let dataObj = cached.dataCache.find(obj => obj.id == id)
    let data = dataObj.x.map((e, i) => {
                  let pair = new Object()
                  pair.x = e
                  pair.y = dataObj.y[i]
                  return pair
                })

    let lambda = 0.00001 * Math.pow(2, 9.9784 * Math.log(freq) + 3.975)
    const spline = simpleSmoothingSpline(data, { 'lambda': lambda })

    // convert spline to Plotly format
    let xArr = []
    let yArr = []
    for (const obj of spline.points) {
      xArr.push(obj.x)
      yArr.push(obj.y)
    }

    let splineObj = new Object()
    splineObj.x = xArr
    splineObj.y = yArr

    this.addSpline(id, freq, splineObj)
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
      newState.dataPlotLocation = 1

      newState.indexPointsActive = false
      newState.indexSplineActive = false
      newState.indexSplineFreq = 0
      newState.indexPlotLocation = 1

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
