import { reactive } from 'vue'

const states = reactive({
  past: [],
  current: [],
  future: [],
})


const cache = reactive({
  raw: [],
  splines: {
              raw: [],
              index: [],
           },
  index: [],
  plots: [{ value: 1, name: 'Plot 1' },
          { value: 2, name: 'Plot 2' }],
  loadSequence: [],
  colors: [
            '#1f77b4',  // muted blue
            '#ff7f0e',  // safety orange
            '#2ca02c',  // cooked asparagus green
            '#d62728',  // brick red
            '#9467bd',  // muted purple
            '#8c564b',  // chestnut brown
            '#e377c2',  // raspberry yogurt pink
            '#7f7f7f',  // middle gray
            '#bcbd22',  // curry yellow-green
            '#17becf'   // blue-teal
          ],
  colorIndex: 0,
  shapes: [{value: false, name: 'None'},
           { value: 'circle', name: 'Circle' },
           { value: 'triangle-up', name: 'Triangle' },
           { value: 'triangle-down', name: 'Inverse Triangle' },
           { value: 'square', name: 'Square' },
           { value: 'diamond', name: 'Diamond' },
           { value: 'circle-open', name: 'Open Circle' },
           { value: 'triangle-up-open', name: 'Open Triangle' },
           { value: 'triangle-down-open', name: 'Open Inverse Triangle' },
           { value: 'square-open', name: 'Open Square' },
           { value: 'diamond-open', name: 'Open Diamond' }],
  allID: 111,
  medianID: 222,
  states: [],
  modals: [],
  dataIDsForMedian: [],
})

const methods = {
  initializeData: function(data) {
    // create all & median states
    let statesDEFAULT = {
      shape: false,
      applyColorToRaw: true,
      rawPointsActive: false,
      rawSplineFreq: false,
      rawPlotLocation: 1,
      indexPointsFreq: false,
      indexSplineFreq: false,
      indexPlotLocation: 2,
    }

    let modalDEFAULT = {
      active: false,
      top: 0,
      outOfBounds: false,
    }

    let statesARR = [{
      id: cache.allID,
      name: 'All',
      color: '#ffffff'
    },
    {
      id: cache.medianID,
      name: 'Median',
      color: '#001eff'
    }]

    let modalARR = [{
      id: cache.allID,
    },
    {
      id: cache.medianID,
    }]

    for (const obj of statesARR) {
      Object.assign(obj, statesDEFAULT)
      cache.states.push(obj)
    }

    for (const obj of modalARR) {
      Object.assign(obj, modalDEFAULT)
      cache.modals.push(obj)
    }

    let medianPoints = new Object()
    medianPoints.id = cache.medianID
    medianPoints.x = []
    medianPoints.y = []
    cache.raw.push(medianPoints)

    // base core sets given specifc IDs
    let id = 1

    for (const set of data) {
      let newState = new Object()

      let rawPointsBOOL = (id === 1) ? true : false
      let rawSplineNUM = (id === 1) ? 20 : false
      let indexPointsNUM = (id === 1) ? 20 : false
      let indexSplineNUM = (id === 1) ? 20 : false

      // default state values
      newState.id = id
      newState.name = set.name
      newState.file = 'DendroElevator'
      newState.color = cache.colors[cache.colorIndex]
      cache.colorIndex++
      newState.shape = false
      newState.applyColorToRaw = true

      newState.rawPointsActive = rawPointsBOOL
      newState.rawSplineFreq = rawSplineNUM
      newState.rawPlotLocation = 1

      newState.indexPointsFreq = indexPointsNUM
      newState.indexSplineFreq = indexSplineNUM
      newState.indexPlotLocation = 2

      states.current.push(newState)

      // cache data
      let newPoints = new Object()
      newPoints.id = id
      newPoints.x = set.x
      newPoints.y = set.y
      cache.raw.push(newPoints)

      // default active cache values
      let newModal = new Object()
      newModal.id = id
      newModal.active = false
      newModal.top = 0
      newModal.outOfBounds = false
      cache.modals.push(newModal)

      // establish default load sequence
      cache.loadSequence.push(id)

      id++
    }
  },
  loadData: function(data) {
    this.saveCurrent()

    for (const set of data) {
      if (cache.colorIndex == cache.colors.length) {
        cache.colorIndex = 0
      }

      let existingSet = states.current.find(obj => obj.name == set.name)
      if (existingSet) {
        let n = states.current.filter(obj => obj.name.split(' (')[0] == set.name).length
        set.name = set.name + ' (' + n + ')'
      }

      let newState = new Object()

      // set IDs are random 5 digit numbers
      let id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
      while (states.current.some(o => o.id == id)) {
        id = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000
      }

      // default state values
      newState.id = id
      newState.name = set.name
      newState.file = set.fileName
      newState.color = cache.colors[cache.colorIndex]
      cache.colorIndex++
      newState.shape = cache.shapes[0].value
      newState.applyColorToRaw = true

      newState.rawPointsActive = false
      newState.rawSplineFreq = false
      newState.rawPlotLocation = 1

      newState.indexPointsFreq = false
      newState.indexSplineFreq = false
      newState.indexPlotLocation = 2

      states.current.push(newState)

      // cache data
      let newPoints = new Object()
      newPoints.id = id
      newPoints.x = set.x
      newPoints.y = set.y
      cache.raw.push(newPoints)

      // default active cache values
      let newModal = new Object()
      newModal.id = id
      newModal.active = false
      newModal.top = 0
      newModal.outOfBounds = false
      cache.modals.push(newModal)

      // establish default load sequence
      cache.loadSequence.push(id)
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
  },
  allAction: function(prop, val) {
    let copy = JSON.parse(JSON.stringify(states.current))
    for (const obj of copy) {
      obj[prop] = val
    }
    this.newCurrent(copy)
  },
  checkAll: function(prop) {
    let testVal = (states.current[0]) ? states.current[0][prop] : null
    for (let i = 1; i < states.current.length; i++) {
      let val = states.current[i][prop]
      if (val !== testVal) {
        return false
      }
    }
    return testVal
  },
  findDataForMedian: function(activeDataIDs) {
    // if not current, reset raw, splines, & indexes
    let medianRaw = cache.raw.find(o => o.id === cache.medianID)
    medianRaw.x = []
    medianRaw.y = []
    let medianSplineRaw = cache.splines.raw.find(o => o.id === cache.medianID)
    if (medianSplineRaw) {
      medianSplineRaw = {}
    }
    let medianSplineIndex = cache.splines.index.find(o => o.id === cache.medianID)
    if (medianSplineIndex) {
      medianSplineIndex = {}
    }
    let medianIndex = cache.index.find(o => o.id === cache.medianID)
    if (medianIndex) {
      medianIndex = {}
    }

    // find new median
    let dataForMedian = activeDataIDs.map(id => {
      let data = cache.raw.find(o => o.id == id)
      return data
    })
    return dataForMedian.filter(o => o)
  }
}

export default {
  states,
  cache,
  methods
}
