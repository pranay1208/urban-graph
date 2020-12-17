import React from 'react'
import PropTypes from 'prop-types';
import Chart, {ArgumentAxis, CommonSeriesSettings, Grid, Legend, Margin, Series, Tooltip, Export, Crosshair} from 'devextreme-react/chart'
import PieChart, {
    Series as PSeries,
    Label as PLabel,
    Connector as PConnector,
    Size as PSize,
    Export as PExport
  } from 'devextreme-react/pie-chart';
import Paper from '@material-ui/core/Paper'
import dataAggregate from './dataAggregators'

class UrbanGraph extends React.Component {

    //TODO: Implement Crosshairs, Export and other such optional components
    //TODO: Implement bullet and non-line/non-pie chart funcitonality
    constructor(props){
        super(props)
        this.makeChart = this.makeChart.bind(this)
        this.makePieChart = this.makePieChart.bind(this)
    }

    getChartType(chartType){
        switch(chartType){
            case "pie":
            case "doughnut": 
                return this.makePieChart
            default: 
                return this.makeChart
        }
    }

    makeChart(){
        let {_data, _seriesList, _argAxis} = dataAggregate.needForNumerationChart(
            this.props.data, this.props.seriesList, this.props.argumentAxis, this.props.aggregate
            )
        return (
            <Chart palette={this.props.colourTheme} dataSource={_data} title={this.props.title}>
                <CommonSeriesSettings argumentField={_argAxis} type={this.props.graphType}/>
                {_seriesList.map((value, index)=>{
                    return <Series valueField={value} key={index} name={value}/>
                })}
                <ArgumentAxis valueMarginsEnabled={true} discreteAxisDivisionMode="crossLabels">
                    <Grid visible={true}/>
                </ArgumentAxis>
                <Crosshair enabled={this.props.crosshair} color="#949494" width={2} dashStyle="line"/>
                <Margin bottom={20}/>
                <Legend verticalAlignment="top" horizontalAlignment="center" itemTextPosition="top"/>
                <Tooltip enabled={true}/>
                <Export enabled={this.props.export}/>
            </Chart>
        );
    }

    makePieChart(){
        let {_seriesList, _data} = dataAggregate.needForNumerationPie(this.props.data, this.props.seriesList, this.props.argumentAxis, this.props.aggregate)
        return (
            <PieChart
                id="pie"
                dataSource={_data}
                palette={this.props.colourTheme}
                title={this.props.title}
                type={this.props.graphType}
                style={{width:"50%", margin:"auto"}}
                // onPointClick={this.pointClickHandler}
                // onLegendClick={this.legendClickHandler}
            >
                {_seriesList.map((value,index)=>{
                    return <PSeries key={index} argumentField={value.arg} valueField={value.val}>
                        <PLabel visible={true}>
                            <PConnector width={1} visible={true}/>
                        </PLabel>
                    </PSeries>
                })}
                <PSize width={500} />
                <PExport enabled={this.props.export} />
            </PieChart>
        )
    }

    render(){
        const chart = this.getChartType(this.props.graphType)()
        return (
            <div style={{margin: "20px", padding: "10px"}}>
                <Paper elevation={2} style={{padding: "10px"}}>
                    {chart}
                </Paper>
            </div>
        );
    }
}

UrbanGraph.propTypes = {
    data: PropTypes.array.isRequired,
    graphType: PropTypes.oneOf(['bar', 'line', 'spline', 'stackedBar', 'area', 'pie', 'doughnut']),
    seriesList: PropTypes.arrayOf(PropTypes.string),
    colourTheme: PropTypes.string,
    argumentAxis: PropTypes.string, //for line graphs's y-axis, and when pie's value has number in it already
    title: PropTypes.string,
    aggregate: PropTypes.bool,
    export: PropTypes.bool,
    crosshair: PropTypes.bool
}

UrbanGraph.defaultProps = {
    export: false,
    aggregate: false,
    crosshair: false,
    graphType: "line",
    colourTheme: "Bright"
}

export default UrbanGraph