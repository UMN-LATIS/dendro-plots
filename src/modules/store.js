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
  plots: [{ id: 1, name: 'Raw Data', legend: false, legendType: 0 },
          { id: 2, name: 'Index Data', legend: false, legendType: 0 },
          { id: 3, name: 'Skeleton Plot', legend: false, legendType: 0}],
  loadSequence: [],
  dendroColors: [
                 '#b2182b', // dark red (tw)
                 '#f4a582', // light red (ew)
                 '#d6604d', // middle red (lw)
               ],
  colors: [
            '#a6cee3', // light blue
            '#1f78b4', // dark blue
            '#b2df8a', // light green
            '#33a02c', // dark green
            '#cab2d6', // light purple
            '#6a3d9a',  // dark purple
            '#fdbf6f', // light orange
            '#ff7f00', // dark orange
            '#fb9a99', // light red
            '#e31a1c', // dark red
          ],
  colorIndex: 0,
  shapes: [{id: false, name: 'No markers'},
           { id: 'circle', name: 'Circles' },
           { id: 'triangle-up', name: 'Triangles' },
           { id: 'triangle-down', name: 'Inverse Triangles' },
           { id: 'square', name: 'Squares' },
           { id: 'diamond', name: 'Diamonds' },
           { id: 'circle-open', name: 'Open Circles' },
           { id: 'triangle-up-open', name: 'Open Triangles' },
           { id: 'square-open', name: 'Open Squares' },
           { id: 'diamond-open', name: 'Open Diamonds' }],
  allID: 111,
  medianIDs: [220, 221],
  dataIDS_forMedian: [],
  colorsBeforeSpag: [],
  states: [],
  modals: [],
  spagActive: false,
  spagColor: '#006994',
  updatePlotSwitch: false,
  hightlightYear: false,
  plotStates: [true, false, false],
  downloadFileType: "CSV",
  activePlotOptions: null,
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
      color: '#000000',
      file: 'DendroPlots'
    },
    {
      id: cache.medianIDs[1],
      name: 'Median B',
      color: '#000000',
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
        cache.updatePlotSwitch = !cache.updatePlotSwitch
        continue;
      }

      // else create new profile
      let newState = new Object()

      // default state values
      newState.id = id
      newState.name = set.name
      newState.file = 'DendroElevator'
      newState.color = cache.dendroColors[id]
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
      newState.shape = cache.shapes[0].id
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
}

export default {
  states,
  cache,
  methods
}