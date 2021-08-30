import { reactive } from 'vue'
import { simpleSmoothingSpline } from 'simple-smoothing-spline'

/*
  States stored as objects. When current states changes, a Plotly trace is created & rendered.
*/

const states = reactive({
  past: [],
  current: [],
  future: [],
})

/*
  caches are an array of objects which do not change when undo/redo triggered
    * splines: [
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
    * data: [
                  {
                    id: 12345,
                    x: [...],
                    y: [...],
                  },
                  ...
                ]
    * indices: [
                  {
                    id: 12345,
                    x: [...],
                    y: [...],
                  },
                  ...
                ]
*/

const cache = reactive({
  splines: [],
  data: [],
  indices: [],
  modals: [],
  plots: [{ value: 1, name: 'Plot 1' },
          { value: 2, name: 'Plot 2' }],
  activePlotNUM: 0,
  loadSequence: [],
})

const methods = {
  addSpline: function(id, freq, data) {
    let splineObj = cache.splines.find(obj => obj.id == id)
    if (splineObj) {
      splineObj[freq] = data
    } else {
      splineObj = new Object()
      splineObj.id = id
      splineObj[freq] = data
      cache.splines.push(splineObj)
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
    let splineObj = cache.splines.find(obj => obj.id == id)
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
    let dataObj = cached.data.find(obj => obj.id == id)
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
      let existingSet = states.current.find(obj => obj.name == set.name)
      if (existingSet) {
        let n = states.current.filter(obj => obj.name.split(' (')[0] == set.name).length
        set.name = set.name + ' (' + n + ')'
      }

      let newState = new Object()
      // set IDs are random 5 digit numbers
      let id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000

      // default state values
      newState.id = id
      newState.name = set.name
      newState.file = set.fileName
      newState.color = '#FF0000'
      newState.colorState = true

      newState.dataPointsActive = false
      newState.dataSplineFreq = false
      newState.dataPlotLocation = 1

      newState.indexPointsFreq = false
      newState.indexSplineFreq = false
      newState.indexPlotLocation = 1

      states.current.push(newState)

      // cache data
      let newData = new Object()
      newData.id = id
      newData.x = set.x
      newData.y = set.y
      cache.data.push(newData)

      // default active cache values
      let newModal = new Object()
      newModal.id = id
      newModal.active = false
      newModal.top = 0
      newModal.outOfBounds = false
      cache.modals.push(newModal)

      // establish default load sequence
      cache.loadSequence.push(newState.id)
    }
  },
  addTo: function(data, property) {
    states[property].push(data)
  },
  undo: function() {
    let recentState = states.past[states.past.length - 1]
    states.past.pop()
    this.addTo(states.current, 'future')
    states.current = recentState
  },
  redo: function() {
    let recentState = states.future[states.future.length - 1]
    states.future.pop()
    this.addTo(states.current, 'past')
    states.current = recentState
  },
  saveCurrent: function() {
    states.future = []
    let currentCopy = JSON.parse(JSON.stringify(states.current))
    states.past.push(currentCopy)
  },
  newCurrent: function(data, id, property) {
    this.saveCurrent()
    if (id && property) {
      let currentSet = states.current.find(obj => obj.id == id)
      currentSet[property] = data
    } else {
      states.current = data
    }
  },
  modifyCurrent: function(data, id, property) {
    let currentSet = states.current.find(obj => obj.id == id)
    currentSet[property] = data
  },
  removeCurrent: function(id) {
    this.saveCurrent()
    let setIndex = states.current.findIndex(obj => obj.id == id)
    states.current.splice(setIndex, 1)
  },
  updateCache: function(name, id, prop, data) {
    let obj = cache[name].find(o => o.id == id)
    obj[prop] = data
  }
}

export default {
  states,
  cache,
  methods
}
