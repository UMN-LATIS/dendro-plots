import store from './store.js'
import createSpline from './spline.js'
import createIndex from './index.js'
import createMedian from './median.js'

function simpleTrace(obj, colorTrace, propA, propB) {
  // only splines have 2 properties (splines, raw or index.)
  let x = (propB) ? obj[propA][propB].x : obj[propA].x
  let y = (propB) ? obj[propA][propB].y : obj[propA].y
  let color = (colorTrace) ? obj.color : '#797979'
  let opacity = (propB) ? 1 : 0.5 // opacity for gray scale
  opacity = (colorTrace) ? 0.7 : opacity // opacity for color
  let width = (obj.shape) ? 1 : 2
  let mode = (obj.shape) ? 'lines+markers' : 'lines'

  let trace = new Object()
  trace.name = obj.name
  trace.x = x
  trace.y = y
  trace.line = { color: color, width: width }
  trace.opacity = opacity
  trace.mode = mode
  if (obj.shape) {
    trace.marker = { symbol: obj.shape, size: 8 }
  }
  trace.type = 'scatter' // need scatter gl

  return trace
}

async function splineTrace(obj, prop, freq, splineFORindex) {
  let freqName = freq + 'yr'
  if (freq < 1) {
    let years = obj.raw.x.filter(Boolean)
    let yearSpan = Math.abs(years[years.length - 1] - years[0]) + 1
    freqName = (100 * freq) + '%'
    freq = freq * yearSpan
  }

  let x, y
  if (splineFORindex) {
    let indexObj = store.cache.index.find(o => o.id == obj.id)
    let index = (indexObj) ? indexObj[freq] : null
    if (!index) {
      let splineObj = store.cache.splines.raw.find(o => o.id == obj.id)
      let spline
      if (splineObj && splineObj[freq]) {
        spline = splineObj[freq]
      } else {
        spline = await createSpline(obj.raw.x, obj.raw.y, freq, obj.id, prop, 'raw')
      }
      index = createIndex(obj.raw.x, obj.raw.y, spline, freq, obj.id)
    }
    x = index.x
    y = index.y
  } else {
    x = obj.raw.x
    y = obj.raw.y
  }

  // spline data previously saved
  if (!obj.spline[prop]) {
    let spline = await createSpline(x, y, freq, obj.id, prop)

    // add spline to obj
    obj.spline[prop] = {
      x: spline.x,
      y: spline.y,
    }
  }

  obj = JSON.parse(JSON.stringify(obj))
  obj.name = obj.name + '_' + freqName +'_spline'
  obj.shape = false

  let trace = simpleTrace(obj, !obj.applyColorToRaw, 'spline', prop)

  return trace
}

async function indexTrace(obj, prop, freq) {
  let freqName = freq + 'yr'
  if (freq < 1) {
    let years = obj.raw.x.filter(Boolean)
    let yearSpan = Math.abs(years[years.length - 1] - years[0]) + 1
    freqName = (100 * freq) + '%'
    freq = freq * yearSpan
  }

  if (!obj.index) {
    // check if spline exists in order to compute index
    let splineObj = store.cache.splines.raw.find(o => o.id == obj.id)
    let spline
    if (splineObj && splineObj[freq]) {
      spline = splineObj[freq]
    } else {
      spline = await createSpline(obj.raw.x, obj.raw.y, freq, obj.id, prop, 'raw')
    }
    let index = createIndex(obj.raw.x, obj.raw.y, spline, freq, obj.id)

    // add index to obj
    obj.index = {
      x: index.x,
      y: index.y
    }
  }

  obj = JSON.parse(JSON.stringify(obj))
  obj.name = obj.name + '_' + freqName +'_index'

  let trace = simpleTrace(obj, obj.applyColorToRaw, prop)

  return trace
}

// param (locVal): plot location value
const formatTraces = function(locVal) {
  let arr = new Array()

  // create array with data only intended for specified plot
  let storeCopy = JSON.parse(JSON.stringify(store.states.current))

  // filter out inactive data sets
  let activeStates = storeCopy.filter(o => (o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq))

  // calculate and add medians to copy
  for (const id of store.cache.medianIDs) {
    let medianState = store.cache.states.find(o => o.id === id)
    if (medianState && medianState.rawPointsActive) {
      let rawData_forMedian = []
      let rawIDs = []
      let indexIDs = []
      for (const state of activeStates) {
        if (medianState.rawPlotLocation == state.rawPlotLocation) {
          let raw = store.cache.raw.find(o => o.id === state.id)
          rawData_forMedian.push(raw)
          rawIDs.push(state.id)
        }
        if (medianState.rawPlotLocation == state.indexPlotLocation && state.indexPointsFreq) {
          let index = store.cache.index.find(o => o.id === state.id)[state.indexPointsFreq]
          rawData_forMedian.push(index)
          indexIDs.push(state.id)
        }
      }

      if (rawData_forMedian.length < 1) continue

      let needNewMedian = false

      let savedMedian = store.cache.dataIDS_forMedian.find(o => o.id === medianState.id)
      if (savedMedian.rawIDs.length != rawIDs.length) needNewMedian = true
      if (savedMedian.indexIDs.length != indexIDs.length) needNewMedian = true
      // check all ids are the same
      rawIDs.sort()
      for (let i = 0; i < rawIDs.length && !needNewMedian; i++) {
        if (savedMedian.rawIDs[i] != rawIDs[i]) {
          needNewMedian = true
        }
      }
      indexIDs.sort()
      for (let i = 0; i < indexIDs.length && !needNewMedian; i++) {
        if (savedMedian.indexIDs[i] != indexIDs[i]) {
          needNewMedian = true
        }
      }

      if (needNewMedian) {
        savedMedian.rawIDs = rawIDs
        savedMedian.indexIDs = indexIDs
      }

      let median = store.cache.raw.find(o => o.id === medianState.id)
      let calculatedMedian = (needNewMedian) ? createMedian(rawData_forMedian) : store.cache.raw.find(o => o.id === medianState.id)
      median.x = calculatedMedian.x
      median.y = calculatedMedian.y
      activeStates.push(JSON.parse(JSON.stringify(medianState)))
    }
  }

  let activePlots = activeStates.map(o => {
    if (o.rawPlotLocation != locVal) {
      delete o.rawPointsActive
      delete o.rawSplineFreq
    }
    if (o.indexPlotLocation != locVal) {
      delete o.indexPointsFreq
      delete o.indexSplineFreq
    }

    return o
  })

  // add required raw data, splines, & index to states
  let activeData = activePlots.map(obj => {
    // add raw data to all in-case spline or index requires computation
    let raw = store.cache.raw.find(o => o.id == obj.id)
    obj.raw = {
      x: raw.x,
      y: raw.y
    }

    if (obj.rawSplineFreq) {
      let rawSpline = store.cache.splines.raw.find(o => o.id == obj.id)
      obj.spline = {
        raw: (rawSpline) ? rawSpline[obj.rawSplineFreq] : null
      }
    }

    if (obj.indexPointsFreq) {
      let index = store.cache.index.find(o => o.id == obj.id)
      obj.index = (index) ? index[obj.indexPointsFreq] : null
    }

    if (obj.indexSplineFreq) {
      let indexSpline = store.cache.splines.index.find(o => o.id == obj.id)
      obj.spline = {
        index: (indexSpline) ? indexSpline[obj.indexSplineFreq] : null
      }
    }

      return obj
  })

  // create traces based on needed format
  // order of creation important
  // most recent trace rendered on top of earlier traces
  activeData.forEach(obj => {
    if (obj.rawSplineFreq) {
      arr.push(splineTrace(obj, 'raw', obj.rawSplineFreq))
    }
    if (obj.rawPointsActive) {
      arr.push(simpleTrace(obj, obj.applyColorToRaw, 'raw'))
    }
    if (obj.indexSplineFreq) {
      arr.push(splineTrace(obj, 'index', obj.indexSplineFreq, true))
    }
    if (obj.indexPointsFreq) {
      arr.push(indexTrace(obj, 'index', obj.indexPointsFreq))
    }
  })

  return arr
}

export default formatTraces
