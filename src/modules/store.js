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
  modals: [],
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
  shapes: [{ value: 'circle', name: 'Circle' },
           { value: 'triangle-up', name: 'Triangle' },
           { value: 'triangle-down', name: 'Inverse Triangle' },
           { value: 'square', name: 'Square' },
           { value: 'diamond', name: 'Diamond' },
           { value: 'circle-open', name: 'Open Circle' },
           { value: 'triangle-up-open', name: 'Open Triangle' },
           { value: 'triangle-down-open', name: 'Open Inverse Triangle' },
           { value: 'square-open', name: 'Open Square' },
           { value: 'diamond-open', name: 'Open Diamond' }]
})

const methods = {
  loadData: function(data) {
    let colorIndex = 0
    let shapeIndex = 0

    this.saveCurrent()

    for (const set of data) {
      if (colorIndex == cache.colors.length) {
        colorIndex = 0
      }
      if (shapeIndex == cache.shapes.length) {
        shapeIndex = 0
      }

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
      newState.color = cache.colors[colorIndex]
      colorIndex++
      newState.shape = cache.shapes[shapeIndex].value
      shapeIndex++
      newState.colorState = true

      newState.rawPointsActive = false
      newState.rawSplineFreq = false
      newState.rawPlotLocation = 1

      newState.indexPointsFreq = false
      newState.indexSplineFreq = false
      newState.indexPlotLocation = 1

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
