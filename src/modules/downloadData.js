import store from './store.js'

function downloadData(data) {
    //for each file type: call specific function
    if (store.cache.downloadFileType == "CSV") {
        console.log(constructSeperatedString(data, ","))
    } else if (store.cache.downloadFileType == "TSV") {
        console.log(constructSeperatedString(data, "\t"))
    } else {
        console.log(constructRWLString(data))
    }
}

function constructSeperatedString(data, sep) {
    // Find earliest and latest year in all data sets
    let startYear = Infinity;
    let endYear = 0;
    for (let dataSet of data.slice(2)) {
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
        for (let dataSet of data.slice(2)) {
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
    let outStr = seperatedHeader(sep);
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

function seperatedHeader(sep) {
    let header = "Year" + sep;
    for (let obj of store.states.current.slice(0, -1)) {
        header += obj.name + sep;
    }
    header += store.states.current[store.states.current.length-1].name + '\n';
    return header
}

function constructRWLString(data) {
    let outStr = ""
    for (let i = 0; i < data.length - 2; i++) {
        let dataSet = data[i+2]
        // console.log(store.states.current[0])
        let name = constructNameRWL(store.states.current[i].name);
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