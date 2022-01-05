function binarySearch(arr, val) {
  let hi = arr.length - 1
  let lo = 0
  let mid
  let found

  while (lo <= hi) {
    mid = Math.floor((hi + lo) / 2)
    found = arr[mid]

    if (val == found) {
      return mid
    }

    if (val < found) {
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  return null
}

const createMedian = function (d) {
  let data = JSON.parse(JSON.stringify(d));

  if (!data.find(e => e)) {
    return { x: [], y: [] }
  }

  var medianYears = []
  var medianWidths = []
  var earliestYear = Number.MAX_SAFE_INTEGER
  var lastYear = -Number.MAX_SAFE_INTEGER

  for (let set of data) {
    let years = set.x.filter(Boolean);
    // find oldest (smallest) year in all sets of data
    earliestYear = (years[0] < earliestYear) ? years[0] : earliestYear;
    // find most recent (largest) year in all sets of data
    lastYear = (years[years.length - 1] > lastYear) ? years[years.length - 1] : lastYear;
  }

  for (let year = earliestYear; year <= lastYear; year++) {
    // find all widths for a given year
    var yearWidths = [];
    let i
    for (let set of data) {
      i = binarySearch(set.x, year)
      if (i) yearWidths.push(set.y[i])
    }

    // find median width of that year
    yearWidths.sort( (a, b) => { return a - b} ); // sort into asscending order
    if (yearWidths.length == 0) {
      medianWidths.push(0);
    } else if (yearWidths.length % 2 == 0) { // if even length, need to take average of middle values
      var midUpper = (yearWidths.length / 2);
      var midLower = (yearWidths.length / 2) - 1;
      medianWidths.push((yearWidths[midUpper] + yearWidths[midLower]) / 2);
    } else {
      var mid = Math.floor(yearWidths.length / 2);
      medianWidths.push(yearWidths[mid]);
    }

    medianYears.push(year);
  }

  // 2) add to data
  var medianSet = new Object();
  medianSet.y = medianWidths;
  medianSet.x = medianYears;

  return medianSet
}

export default createMedian
