import React from 'react'
import PropTypes from 'prop-types';
import Chart, {ArgumentAxis, CommonSeriesSettings, Grid, Legend, Margin, Series, Tooltip, Export} from 'devextreme-react/chart'
import PieChart, {
    Series as PSeries,
    Label as PLabel,
    Connector as PConnector,
    Size as PSize,
    Export as PExport
  } from 'devextreme-react/pie-chart';
import Paper from '@material-ui/core/Paper'

export default class UrbanGraph extends React.Component {

    //TODO: Implement Crosshairs, Export and other such optional components
    //TODO: Implement bullet and non-line/non-pie chart funcitonality
    _data;

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
        let _data = this.props.data
        return (
            <Chart palette={this.props.colourTheme} dataSource={_data} title="Just some random data">
                <CommonSeriesSettings argumentField={this.props.argumentAxis} type={this.props.graphType}/>
                {this.props.seriesList.map((value, index)=>{
                    return <Series valueField={value} key={index} name={value}/>
                })}
                <ArgumentAxis valueMarginsEnabled={true} discreteAxisDivisionMode="crossLabels">
                    <Grid visible={true}/>
                </ArgumentAxis>
                <Margin bottom={20}/>
                <Legend verticalAlignment="top" horizontalAlignment="center" itemTextPosition="top"/>
                <Tooltip enabled={true}/>
                <Export enabled={true}/>
            </Chart>
        );
    }

    needForNumeration(data, seriesList) {
        
    }

    makePieChart(){
        let {_seriesList, _data} = this.needForNumeration(this.props.data, this.props.seriesList)
        // *Series list will be [{arg: arg, val:val}]
        return (
            <PieChart
                id="pie"
                dataSource={_data}
                palette={this.props.colourTheme}
                title="Just some random data"
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
                <PExport enabled={true} />
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
    graphType: PropTypes.oneOf(['bar', 'line', 'spline', 'stackedBar', 'area', 'pie', 'doughnut']).isRequired,
    seriesList: PropTypes.arrayOf(PropTypes.string),
    colourTheme: PropTypes.string,
    argumentAxis: PropTypes.string //for line graphs's y-axis, and when pie's value has number in it already
}

