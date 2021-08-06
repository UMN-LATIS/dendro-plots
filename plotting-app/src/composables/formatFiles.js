// parse local core points in LTreering
// window.postMessage({ widths: [], years: [], name: "" })

// use distance & annotation data in JSON

import Papa from 'papaparse'

function toMM (num) {
  if (num.length == 4) {
    // 1234 => 1.234
    return num.slice(0, 1) + '.' + num.slice(1);
  } else if (num.length == 3) {
    // 123 => 0.123
    return '0.' + num
  } else if (num.length == 2) {
    // 12 => 0.012
    return '0.0' + num
  } else {
    // 1 => 0.001
    return '0.00' + num
  }
}

function formatRWL (data) {
  var formattedData = [];
  // 1) rwl remove header
  var headerLength = 0
  for (let array of data) {
    let test_character = array[0].charAt(9)
    if (isNaN(parseFloat(test_character))) {
      headerLength++
    } else {
      break
    }
  }
  data.splice(0, headerLength);
  // 2) split rwl data into array
  // current format: [Core name, year, length, length, length, ...], ...
  var rwlSplitData = []
  for (let array of data) {
    var splitData = array[0].split(/[\s]+/)
    rwlSplitData.push(splitData)
  }
  // 3) build new header
  // header format: [Year, Core 1 name, Core 2 name, ...]
  var newHeader = ['Year'];
  var currentName = '';
  for (let array of rwlSplitData) {
    let rowName = array[0];
    if (rowName != currentName && rowName) {
      newHeader.push(rowName);
      currentName = rowName;
    };
  };
  // 4) create arrays for all years
  // format: [Year, ...], [1900, ...], [1901, ...]
  var earliestYear = Number.MAX_SAFE_INTEGER;
  var latestDecade =  -1 * Number.MAX_SAFE_INTEGER;
  var latestYear = 0;
  var rwlData1 = JSON.parse(JSON.stringify(rwlSplitData)); // create new array for data so old one is not modified
  for (let array of rwlData1) {
    var year = parseInt(array[1]);
    if (year < earliestYear) { // find first year
      earliestYear = year;
    } else if (year > latestDecade) { // find last year
      array.splice(0, 2) // remove row name & decade/year
      array = array.filter((e) => { // remove sentinel, sentinel = indicator of specimens final width
        if ((isNaN(parseFloat(e)) == false) &&
        (parseFloat(e) > 0) &&
        (e != '999')) {
          return e
        }
      });
      var years_to_add = array.length - 1; // add number of widths to found year, subtract 1 b/c RWL starts at 0 not 1
      latestDecade = year;
      latestYear = year + years_to_add;
    }
  }
  for (var k = earliestYear; k <= latestYear; k++) {
    var newArray = [];
    newArray.push(String(k));
    formattedData.push(newArray);
  }
  // 5) format & add widths to data
  // format: [Year, Core 1 name, Core 2 name, ...], [1900, width 1, width 2, ...], [1901, width 1, width 2, ...]
  var rwlData2 = JSON.parse(JSON.stringify(rwlSplitData)); // create new array for data so old one is not modified
  var prev_name = '';
  var newSet = true;
  for (let rwlArray of rwlData2) {
    var curr_name = rwlArray[0];
    if (curr_name == prev_name) {
      newSet = false;
    } else {
      newSet = true;
      prev_name = curr_name;
    }

    var startYear = parseFloat(rwlArray[1]);
    var yearAdj = 0; // index of width in RWL as well as that widths year
    rwlArray.splice(0, 2); // remove row name & decade/year
    for (let array of formattedData) {
      var year_in_formattedData = array[0];
      if (yearAdj > rwlArray.length - 1) {
        yearAdj = 0;
        break
      }
      var year_in_rwlData = String(startYear + yearAdj);
      if (year_in_rwlData == year_in_formattedData) {
        var width_to_test = rwlArray[yearAdj];
        if ((isNaN(parseFloat(width_to_test)) == false) &&
            (parseFloat(width_to_test) > 0) &&
            (width_to_test != '999')) {
          // check that width is not a sentinel (indicator of end of core)
          var width = toMM(rwlArray[yearAdj])
          array.push(width);
          yearAdj++
        } else { // if sentinel, add -1 (missing data indicator) to rest of formattedData
          var current_array_index = formattedData.indexOf(array);
          for (var l = current_array_index; l < formattedData.length; l++) {
            var array_needing_neg_one = formattedData[l];
            array_needing_neg_one.push('-1');
          }
          break
        }
      } else if (newSet == true) {
        array.push('-1')
      }
    }
  }
  // 6) add header
  formattedData.unshift(newHeader);

  return formattedData
}

function formatSpaceDelim (data) {
  var formattedData = []
  for (let array of data) {
    let splitData = array[0].split(/[\s]+/)
    formattedData.push(splitData)
  }

  console.log(formattedData)
  return formattedData
}

function parseFile (file) {
  return new Promise((resolve, reject) => {
    let fr = new FileReader()
    fr.onload = function(event, i) {
      if (file.type == 'application/json') {
        resolve(JSON.parse(event.target.result).distances)
        // diatances format: [Year, Core Name], [1900, 1.5], [1901, 1.1], ...
      } else {
        let papaObj = Papa.parse(event.target.result, {delimitersToGuess: [',', '\t']})
        if (papaObj.errors.length) { // rwl or space demilited files
          // space delimited has a years in far left column, RWL had specimen names, way to differentiate
          var split_second_row = papaObj.data[1][0].split(/[\s]+/);
          var test_string = split_second_row[0];
          if (isNaN(parseFloat(test_string))) {
            resolve(formatRWL(papaObj.data))
          } else {
            resolve(formatSpaceDelim(papaObj.data))
          }
        } else { // CSV, TSV files
          resolve(papaObj.data)
        }
      }
    }
    fr.onerror = err => reject(err);

    fr.readAsText(file)
  })
}

async function parseFiles(files) {
  var parsedFiles = [];

  for (let file of files) {
    let parsedFile = await parseFile(file)
    parsedFiles.push(parsedFile)
  }

  return parsedFiles
}

const formatFiles = function (files) {
  return parseFiles(files)
}

export default formatFiles
