import store from './store.js'
import createSpline from './spline.js'
import createIndex from './index.js'
import createMedian from './median.js'

function simpleTrace(obj, colorTrace, propA, propB) {
  let x = (propB) ? obj[propA][propB].x : obj[propA].x
  let y = (propB) ? obj[propA][propB].y : obj[propA].y
  let color = (colorTrace) ? obj.color : '#797979'
  let opacity = (colorTrace) ? 1 : 0.7
  let width = (obj.shape) ? 2 : 3
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
    let yearSpan = Math.abs(obj.raw.x[obj.raw.x.length - 1] - obj.raw.x[0]) + 1
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
    let yearSpan = Math.abs(obj.raw.x[obj.raw.x.length - 1] - obj.raw.x[0]) + 1
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
const formatTraces = async function(locVal) {
  let arr = new Array()

  // create array with data only intended for specified plot
  let storeCopy = JSON.parse(JSON.stringify(store.states.current))
  // add median to copy
  let median = store.cache.states.find(o => o.id === store.cache.medianID)
  storeCopy.push(JSON.parse(JSON.stringify(median)))

  // filter out inactive data sets
  let activeStates = storeCopy.filter(o => (o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq))

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
    // median
    if (obj.id === store.cache.medianID) {
      // find if median not current
      let activeDataIDs = store.states.current.map(o => {
          if (o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq) {
            return o.id
          }
      })
      if (JSON.stringify(store.cache.dataIDsForMedian.sort()) != JSON.stringify(activeDataIDs.sort())) {
        store.cache.dataIDsForMedian = activeDataIDs
        let data = store.methods.findDataForMedian(activeDataIDs)
        let median = createMedian(data)
        let medianRaw = store.cache.raw.find(o => o.id === store.cache.medianID)
        medianRaw.x = median.x
        medianRaw.y = median.y
      }
    }

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
