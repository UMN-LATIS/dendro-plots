const formatDataObjArray = function (fileDataArray) {
  var arr = new Array()
  /*
    fileData has format:
    [year, nameA, nameB, ...],
    [year1, width1A, width1B, ...],

    convert it to Plotly data object format:
    obj = {
      x: [...], (years)
      y: [...], (widths)
      name: 'nameA',
      ...
    }
  */
  for (let fileData of fileDataArray) {
    for (let col = 1; col < fileData[0].length; col++) {
      var yearArray = []
      var widthArray = []
      for (let row = 1; row < fileData.length; row++) {
        let year = fileData[row][0]
        let width = fileData[row][col]
        if (width >= 0) {
          yearArray.push(parseInt(year))
          widthArray.push(parseFloat(width))
        }
      }
      var obj = new Object()
      obj.name = fileData[0][col]
      obj.x = yearArray
      obj.y = widthArray

      arr.push(obj)
    }
  }

  return arr
}

export default formatDataObjArray
