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
})

const methods = {
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
