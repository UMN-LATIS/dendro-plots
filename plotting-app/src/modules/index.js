import store from './store.js'

const createIndex = function(x, y, spline, freq, id) {
  console.log('created index')

  let xArr = x
  let yArr = x.map((e, i) => {
    let j = spline.x.indexOf(e)
    if (j === -1) {
      // find closest value to use for calculation
      let n = spline.x.reduce((prev, curr) => {
        return (Math.abs(curr - e) < Math.abs(prev - e) ? curr : prev);
      })
      j = spline.x.indexOf(n)
    }
    return y[i] / spline.y[j]
  })

  // save index to index cache in store.js
  let indexObj
  let indexExists = store.cache.index.find(o => o.id == id)
  if (indexExists) {
    indexObj = indexExists
  } else {
    indexObj = new Object()
    indexObj.id = id
    store.cache.index.push(indexObj)
  }
  indexObj[freq] = {
    x: xArr,
    y: yArr,
  }

  return { x: xArr, y: yArr }
}

export default createIndex
