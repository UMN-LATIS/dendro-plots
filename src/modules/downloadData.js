import store from './store.js'

function downloadData() {
    let raw = store.cache.raw.slice(2);
    let states = store.states.current;

    let downloadFunction = function (data) {
        if (store.cache.downloadFileType == "CSV") {
            return constructSeperatedString(data, ",")
        } else if (store.cache.downloadFileType == "TSV") {
            return constructSeperatedString(data, "\t")
        } else {
            return constructRWLString(data)
        }
    }

    let woodTypeObj = {
        'tw': {
            data: [],
            names: []
        },
        'ew': {
            data: [],
            names: []
        },
        'lw': {
            data: [],
            names: []
        },
    }

    for (let i = 0; i < states.length; i++) {
        woodTypeObj[states[i].woodType].data.push(raw[i]);
        woodTypeObj[states[i].woodType].names.push(states[i].name.slice(0, -3))
    }


    // console.log(woodTypeObj)
    console.log('tw')
    console.log(downloadFunction(woodTypeObj['tw']))
    console.log('ew')
    console.log(downloadFunction(woodTypeObj['ew']))
    console.log('lw')
    console.log(downloadFunction(woodTypeObj['lw']))
}

function constructSeperatedString(data, sep) {
    let names = data.names;
    data = data.data
    // Find earliest and latest year in all data sets
    let startYear = Infinity;
    let endYear = 0;
    for (let dataSet of data) {
        let dataStart = dataSet.x[0];
        let dataEnd = dataSet.x[dataSet.x.length - 1]
        if (dataStart < startYear) {
            startYear = dataStart;
        }
        if (dataEnd > endYear) {
            endYear = dataEnd;
        }
    }

    //Organize data into an array for each year, all stored in an object
    //If data does not exist for a specific year in a data set, insert 'na'
    let yearDataPairs = {};
    for (let year = startYear; year <= endYear; year++) {
        yearDataPairs[year] = [];
        for (let dataSet of data) {
            let dataYears = dataSet.x;
            let dataAreas = dataSet.y;
            if (dataYears.find((element) => element == year)) {
                let i = dataYears.findIndex((element) => element == year);
                yearDataPairs[year].push(dataAreas[i].toFixed(3));
            } else {
                yearDataPairs[year].push('na');
            }
        }
    }

    //Construct String from object
    let outStr = seperatedHeader(sep, names);
    let fileCount = yearDataPairs[startYear].length - 1;
    for (let year = startYear; year <= endYear; year++) {
        let emptyYear = true;
        for (let el of yearDataPairs[year]) {
            if (el != 'na') {
                emptyYear = false;
            }
        }
        //If a year has no data, remove it
        if (!emptyYear) {
            outStr += year.toString() + sep;
            for (let i = 0; i < (fileCount); i++) {
                outStr += yearDataPairs[year][i].toString() + sep;
            }
            outStr += yearDataPairs[year][fileCount] + '\n';
        }
    }
    return outStr
}

function seperatedHeader(sep, names) {
    let header = "Year" + sep;
    for (let name of names.slice(0, -1)) {
        header += name + sep;
    }
    header += names.slice(-1) + "\n"
    return header
}

function constructRWLString(data) {
    console.log(data)
    let names = data.names;
    data = data.data

    let outStr = ""
    for (let i = 0; i < data.length; i++) {
        let dataSet = data[i]
        let name = constructNameRWL(names[i]);
        let year = dataSet.x[0];
        let stopMarker = " -9999";

        let singleRWLString = name + year + formatDataPointRWL(dataSet.y[0])
        // If data begins on a year ending in '9', begin newline immediately.
        if ((year + 1) % 10 == 0) {singleRWLString += "\n" + name + (year + 1)}

        for (let j = 1; j < dataSet.x.length; j++) {
            year = dataSet.x[j];
            singleRWLString += formatDataPointRWL(dataSet.y[j]);

            if ((year + 1) % 10 == 0) {
                singleRWLString += "\n" + name + (year + 1);
            }
        }
        singleRWLString += stopMarker + "\n";
        outStr += singleRWLString
    }

    return outStr
}

function formatDataPointRWL(dataPoint) {
    dataPoint *= 1000;
    dataPoint = Math.round(dataPoint);

    // Change 0.999mm measurements to 0.998mm for software compatibility. 
    if (dataPoint == 999) dataPoint = 998;

    dataPoint = String(dataPoint);
    dataPoint = " ".repeat(6 - dataPoint.length) + dataPoint;

    return dataPoint;
}

function constructNameRWL(str) {
    let nameSpaces = 11 - str.length;
    let name = str + " ".repeat(nameSpaces);

    return name;
}

export default downloadData