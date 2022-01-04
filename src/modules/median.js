const createMedian = function (dataArray) {
  if (!dataArray.find(e => e)) {
    return { x: [], y: [] }
  }

  var medianYears = []
  var medianWidths = []
  var year_to_find_median_width_for = Number.MAX_SAFE_INTEGER
  var last_year_to_account_for = -Number.MAX_SAFE_INTEGER

  for (let set of dataArray) {
    let years = set.x.filter(Boolean);
    // find oldest (smallest) year in all sets of data
    year_to_find_median_width_for = (Math.min(...years) < year_to_find_median_width_for) ? Math.min(...years) : year_to_find_median_width_for
    // find most recent (largest) year in all sets of data
    last_year_to_account_for = (Math.max(...years) > last_year_to_account_for) ? Math.max(...years) : last_year_to_account_for
  }

  while (year_to_find_median_width_for <= last_year_to_account_for) {
    var single_year_widths = []
    for (let set of dataArray) { // loop through data sets
      for (let i = 0; i < set.x.length; i++) { // loop through years & widths of each data set
        if ((set.x.length > 0) && (set.x[i] == year_to_find_median_width_for)) {
          single_year_widths.push(set.y[i]);
        }
      }
    }

    single_year_widths.sort( (a, b) => { return a - b} ); // sort into asscending order
    if (single_year_widths.length == 0) {
      medianWidths.push(0);
    } else if (single_year_widths.length % 2 == 0) { // if even length, need to take average of middle values
      var midUpper = (single_year_widths.length / 2);
      var midLower = (single_year_widths.length / 2) - 1;
      var value = (single_year_widths[midUpper] + single_year_widths[midLower]) / 2;
      medianWidths.push(value);
    } else {
      var mid = Math.floor(single_year_widths.length / 2);
      medianWidths.push(single_year_widths[mid]);
    }
    medianYears.push(year_to_find_median_width_for);
    year_to_find_median_width_for++;
  }

  // 2) add to data
  var medianSet = new Object();
  medianSet.y = medianWidths;
  medianSet.x = medianYears;

  return medianSet
}

export default createMedian
