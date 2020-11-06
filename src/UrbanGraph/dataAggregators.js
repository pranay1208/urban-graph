function needForNumerationPie(propsData, propsSeriesList, givenArgumentAxis, aggregate) {
    let data = JSON.parse(JSON.stringify({propsData})).propsData
    let seriesList = [...propsSeriesList]
    const uniqueSeries = seriesList.filter((value,index, self) => self.indexOf(value)===index)

    for(let i=0; i < uniqueSeries.length; i++){
        const uniqSeriesVal = uniqueSeries[i];

        if(typeof data[0][uniqSeriesVal] === "number" && !aggregate){
            seriesList = seriesList.map(value => {
                if(value !== uniqSeriesVal) return value
                return {arg: givenArgumentAxis, val: value}
            })
            continue
        }
        
        let valCounter = {}
        data.forEach(entry=>{
            const value = entry[uniqSeriesVal].toString()
            if(value in valCounter){
                valCounter[value]++
            } else {
                valCounter[value] = 1
            }
        })
        const keyValPairs = Object.entries(valCounter)
        const nameOfArgumentAxis = `UrbanGraphArgAxis:${uniqSeriesVal}`
        const nameOfValueAxis = `UrbanGraphValAxis:${uniqSeriesVal}`
        for(let i=0; i<keyValPairs.length; i++){
            const [key, val] = keyValPairs[i]
            data[i] = {
                ...data[i],
                [nameOfArgumentAxis]: key,
                [nameOfValueAxis]: val
            }
        }
        seriesList = seriesList.map(value => {
            if(value!== uniqSeriesVal) return value
            return {arg: nameOfArgumentAxis, val: nameOfValueAxis}
        })
    }

    return {
        _seriesList: seriesList,
        _data: data
    }
}

function needForNumerationChart(propsData, propsSeriesList, givenArgumentAxis, aggregate) {
    if(!aggregate) {
        return {
            _data: propsData,
            _seriesList: propsSeriesList,
            _argAxis: givenArgumentAxis
        }
    }

    let data = []
    const nameOfArgAxis = "UrbanGraphArgAxisAggregated"
    let seriesList = [...propsSeriesList]
    const uniqueSeries = seriesList.filter((value,index, self) => self.indexOf(value)===index)
    let valCounter = {}
    for(let uniqueVal of uniqueSeries) {
        propsData.forEach(entry => {
            const value = entry[uniqueVal].toString()
            if(value in valCounter) {
                if(uniqueVal in valCounter[value]){
                    valCounter[value][uniqueVal] += 1
                } else {
                    valCounter[value][uniqueVal] = 1
                }
            } else {
                valCounter[value] = {
                    [uniqueVal]: 1,
                }
            }
        })
    }
    for(let [key, value] of Object.entries(valCounter)){
        for(let series of uniqueSeries) {
            if(!(series in value)){
                console.log("series not in val") 
                value[series] = 0 
            }
        }
        data.push({
            [nameOfArgAxis]: key,
            ...value
        })
    }
    return {
        _data: data,
        _seriesList: seriesList,
        _argAxis: nameOfArgAxis
    }
}

const exportFunctions = {
    needForNumerationPie,
    needForNumerationChart,
}
module.exports = exportFunctions