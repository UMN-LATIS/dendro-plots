import store from './store.js'

// Trace
function formatBars(dataID) {
    let obj = store.states.current.find(o => o.id == dataID)
    let raw = store.cache.raw.find(o => o.id == dataID)

    

    let trace = {}
    trace.name = obj.name
    trace.color = obj.color
    trace.x = raw.x
    trace.y = raw.y
    trace.type = 'bar'
    trace.opacity = 1

    return [trace]
}

export default formatBars