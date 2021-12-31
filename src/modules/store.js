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
            '#a6cee3', // light blue
            '#1f78b4', // dark blue
            '#b2df8a', // light green
            '#33a02c', // dark green
            '#fb9a99', // light red
            '#e31a1c', // dark red
            '#fdbf6f', // light orange
            '#ff7f00', // dark orange
            '#cab2d6', // light purple
            '#6a3d9a'  // dark purple
          ],
  colorIndex: 0,
  shapes: [{value: false, name: 'No marker'},
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
  medianIDs: [220, 221],
  dataIDS_forMedian: [],
  states: [],
  modals: [],
  spagActive: false,
  statesBeforeSpag: [],
  cacheStatesBeforeSpag: [],
  updatePlotSwitch: false,
})

const methods = {
  initializeData: function() {
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
      color: '#000000',
      file: 'DendroPlots'
    },
    {
      id: cache.medianIDs[0],
      name: 'Median A',
      color: '#001eff',
      file: 'DendroPlots'
    },
    {
      id: cache.medianIDs[1],
      name: 'Median B',
      color: '#ff0000',
      file: 'DendroPlots'
    }]

    let modalARR = [{
      id: cache.allID,
    },
    {
      id: cache.medianIDs[0],
    },
    {
      id: cache.medianIDs[1],
    }]

    for (const obj of statesARR) {
      Object.assign(obj, statesDEFAULT)
      cache.states.push(obj)
    }

    for (const obj of modalARR) {
      Object.assign(obj, modalDEFAULT)
      cache.modals.push(obj)
    }

    for (const id of cache.medianIDs) {
      let medianIDs = new Object()
      medianIDs.id = id
      medianIDs.rawIDs = []
      medianIDs.indexIDs = []
      cache.dataIDS_forMedian.push(medianIDs)

      let medianPoints = new Object()
      medianPoints.id = id
      medianPoints.x = []
      medianPoints.y = []
      cache.raw.push(medianPoints)
    }
  },
  processSentData: function(data) {
    for (let id = 0; id < data.length; id++) {
      // id: 0 = tw
      // id: 1 = ew
      // id: 2 = lw
      // based on array order set in App.vue

      let set = data[id];

      // check if data profile exists (data in leaflet updated, but new plot not popped out)
      if (cache.raw.find(o => o.id == id)) {
        let raw = cache.raw.find(o => o.id == id)
        raw.x = set.x
        raw.y = set.y

        // reset spline & index data
        let index = cache.index.find(o => o.id == id)
        index = null
        let rawSpline = cache.splines.raw.find(o => o.id == id)
        rawSpline = null
        let indexSpline = cache.splines.index.find(o => o.id == id)
        indexSpline = null

        cache.updatePlotSwitch = !cache.updatePlotSwitch
        continue;
      }

      // else create new profile
      let newState = new Object()

      // default state values
      newState.id = id
      newState.name = set.name
      newState.file = 'DendroElevator'
      newState.color = cache.colors[cache.colorIndex]
      cache.colorIndex++
      newState.shape = false
      newState.applyColorToRaw = true

      newState.rawPointsActive = true
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

      newState.rawPointsActive = true
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
    if ((id || id == 0) && property) {
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
  spagAction: function(active) {
    cache.spagActive = active
    if (active) {
      cache.statesBeforeSpag = JSON.parse(JSON.stringify(states.current))
      cache.cacheStatesBeforeSpag = JSON.parse(JSON.stringify(cache.states))
      this.allAction('color', '#797979')

      let activeStates = states.current.filter(o => (o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq))

      // find which plots are active. Apply medianA to plot 1, medianB to plot 2 (if active).
      let plot1Active = activeStates.some(o => (o.rawPlotLocation == 1 && (o.rawPointsActive || o.rawSplineFreq))
                                            || (o.indexPlotLocation == 1 && (o.indexPointsFreq || o.indexSplineFreq)))
      let plot2Active = activeStates.some(o => (o.rawPlotLocation == 2 && (o.rawPointsActive || o.rawSplineFreq))
                                            || (o.indexPlotLocation == 2 && (o.indexPointsFreq || o.indexSplineFreq)))

      if (plot1Active) {
        this.updateCache('states', 220, 'rawPointsActive', true)
      }
      if (plot2Active) {
        this.updateCache('states', 221, 'rawPlotLocation', 2)
        this.updateCache('states', 221, 'rawPointsActive', true)
      }
    } else {
      states.current = cache.statesBeforeSpag
      cache.states = cache.cacheStatesBeforeSpag
    }
  }
}

export default {
  states,
  cache,
  methods
}
