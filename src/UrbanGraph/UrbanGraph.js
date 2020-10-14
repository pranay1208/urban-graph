import React from 'react'
import PropTypes from 'prop-types';
import Chart, {ArgumentAxis, CommonSeriesSettings, Grid, Legend, Margin, Series, Tooltip} from 'devextreme-react/chart'


export default class UrbanGraph extends React.Component {

    _data;

    constructor(props){
        super(props)
        this._data = this.props.data
        .map((item)=>{
            let newItem = {
                ...item
            }
            newItem.id = item.id*10
            return newItem
        })
        console.log(this._data)
    }

    render(){
        //assign props.data in 
        return (
            <div style={{margin: "20px", padding: "10px"}}>
                <Chart palette="Soft Pastel" dataSource={this._data} title="Just some random data">
                    <CommonSeriesSettings argumentField="firstName" type={this.props.graphType}/>
                    <Series valueField="age" key="1" name="Age"/>
                    <Series valueField="hourServed" key="2" name="Hours Served"/>
                    <Series valueField="id" key="3" name="ID"/>
                    <ArgumentAxis valueMarginsEnabled={true} discreteAxisDivisionMode="crossLabels">
                        <Grid visible={true}/>
                    </ArgumentAxis>
                    <Margin bottom={20}/>
                    <Legend verticalAlignment="top" horizontalAlignment="center" itemTextPosition="top"/>
                    <Tooltip enabled={true}/>
                </Chart>
            </div>
    )
    }
}

UrbanGraph.propTypes = {
    data: PropTypes.array.isRequired,
    graphType: PropTypes.oneOf(['bar', 'line', 'spline', 'stackedBar', 'area']).isRequired
}

