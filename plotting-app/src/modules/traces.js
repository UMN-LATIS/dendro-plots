import store from './store.js'
import createSpline from './spline.js'
import createIndex from './index.js'

function simpleTrace(obj, propA, propB) {
  let x = (propB) ? obj[propA][propB].x : obj[propA].x
  let y = (propB) ? obj[propA][propB].y : obj[propA].y

  let trace = new Object()
  trace.name = obj.name
  trace.x = x
  trace.y = y
  trace.line = { color: obj.color }
  trace.mode = 'lines+markers'
  trace.type = 'scatter' // need scatter gl

  return trace
}

function splineTrace(obj, prop, freq, splineFORindex) {
  let x, y
  if (splineFORindex) {
    let indexObj = store.cache.index.find(o => o.id == obj.id)
    let index = (indexObj) ? indexObj[freq] : null
    if (!index) {
      let splineObj = store.cache.splines.raw.find(o => o.id == obj.id)
      let spline = (splineObj && splineObj[freq]) ? splineObj[freq] : createSpline(obj.raw.x, obj.raw.y, freq, obj.id, prop, 'raw')
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
    let spline = createSpline(x, y, freq, obj.id, prop)

    // add spline to obj
    obj.spline[prop] = {
      x: spline.x,
      y: spline.y
    }
  }

  obj = JSON.parse(JSON.stringify(obj))
  obj.name = obj.name + '_' + freq +'yr_spline'

  let trace = simpleTrace(obj, 'spline', prop)

  return trace
}

function indexTrace(obj, prop, freq) {
  if (!obj.index) {
    // check if spline exists in order to compute index
    let splineObj = store.cache.splines.raw.find(o => o.id == obj.id)
    let spline = (splineObj && splineObj[freq]) ? splineObj[freq] : createSpline(obj.raw.x, obj.raw.y, freq, obj.id, prop, 'raw')
    let index = createIndex(obj.raw.x, obj.raw.y, spline, freq, obj.id)

    // add index to obj
    obj.index = {
      x: index.x,
      y: index.y
    }
  }

  obj = JSON.parse(JSON.stringify(obj))
  obj.name = obj.name + '_' + freq +'yr_index'

  let trace = simpleTrace(obj, prop)

  return trace
}

// param (locVal): plot location value
const formatTraces = function(locVal) {
  let arr = new Array()

  // filter out inactive states
  let activeStates = store.states.current.filter(o => (
    o.rawPointsActive || o.rawSplineFreq || o.indexPointsFreq || o.indexSplineFreq
  ))

  // add required raw data, splines, & index to states
  let activeData = activeStates.map(obj => {
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
  activeData.forEach(obj => {
    if (obj.rawPointsActive) {
      arr.push(simpleTrace(obj, 'raw'))
    }
    if (obj.rawSplineFreq) {
      arr.push(splineTrace(obj, 'raw', obj.rawSplineFreq))
    }
    if (obj.indexPointsFreq) {
      arr.push(indexTrace(obj, 'index', obj.indexPointsFreq))
    }
    if (obj.indexSplineFreq) {
      arr.push(splineTrace(obj, 'index', obj.indexSplineFreq, true))
    }
  })

  console.log(arr)
  return arr
}

export default formatTraces
