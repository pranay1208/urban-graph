import React from 'react';
import './App.css';
import UrbanGraph from './UrbanGraph/UrbanGraph'
import data from './data'
import Select from 'react-select'


const graphTypeOptions = [
  { value: 'line', label: 'Line Graph' },
  { value: 'spline', label: 'Spline Chart' },
  { value: 'bar', label: 'Bar Graph' },
  { value: 'stackedBar', label: 'Stacked Bar Graph' },
  { value: 'area', label: 'Area Graph' },
]


class App extends React.Component {

  state = {
    graphType: null
  }

  changeGraphType = graphType => {
    this.setState({graphType: graphType.value})
  }

  render(){
    return (
      <div className="App">
        <div style={{width: "30%", margin: "10px"}}>
          <Select value={this.state.graphType} 
            onChange={this.changeGraphType} 
            options={graphTypeOptions} 
            placeholder="Select graph type" 
            defaultValue="line"/>
        </div>
        <br/>
        <UrbanGraph data={data.gotData} graphType={this.state.graphType}/>
      </div>
    );
  }
}

export default App;
