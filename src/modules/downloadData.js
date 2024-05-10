function downloadData(data) {
    // console.log(data)
    //for each file type: call specific function
    console.log(seperateDataCombined(data, ','))
}

function seperateDataCombined(data, sep) {
    //Just put every data point in string, regardless of year ordering
    // let outstr = 'Year,Area\n'
    // for (let dataSet of data.slice(2)) {
    //     for (let i = 0; i < dataSet.x.length; i++) {
    //         console.log(dataSet.x[i], dataSet.y[i])
    //         outstr += dataSet.x[i].toString() + sep + dataSet.y[i].toString() + '\n'
    //     }
    // }
    // return outstr

    //Organize data by year first, then put in string
    // let startYear = Infinity
    // let endYear = 0
    // for (let dataSet of data.slice(2)) {
    //     let dataStart = dataSet.x[0]
    //     let dataEnd = dataSet.x[dataSet.x.length - 1]
    //     if (dataStart < startYear) {
    //         startYear = dataStart
    //     }
    //     if (dataEnd > endYear) {
    //         endYear = dataEnd
    //     }
    // }
    
    let yearDataPairs = {};
    for (let dataSet of data.slice(2)) {
        let years = dataSet.x;
        let areas = dataSet.y;
        for (let i = 0; i < years.length; i++) {
            if (yearDataPairs[years[i]]) {
                yearDataPairs[years[i]].push(areas[i])
            }
            else {
                yearDataPairs[years[i]] = [areas[i]]
            }
        }
    }
    return yearDataPairs
}
export default downloadData