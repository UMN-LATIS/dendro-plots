const methods = {
  createTrace: function(data, color, mode) {
    let trace = new Object()
    trace.name = data.name
    trace.x = data.x
    trace.y = data.y
    trace.line = { color: color}
    trace.mode = mode
    trace.type = 'scattergl'
    return trace
  },
  addTrace: function(param_trace, array, i = -1) {
    array.splice(i, 0, param_trace)
    return array
  },
  removeTrace: function(param_trace_name, array) {
    let fil_array = array.filter(trace => trace.name != param_trace_name)
    return fil_array
  }
}

export default {
  methods
}
