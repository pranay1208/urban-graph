import React from 'react';
import './App.css';
import UrbanGraph from './UrbanGraph/UrbanGraph'
import data from './data'
import Form from './Helpers/Form'
// import UG from 'urban_graph'

const seriesOptions = Object.keys(data.gotData[1]).map((value)=>{
  return {
    value: value,
    label: value
  }
})


class App extends React.Component {

  state = {
    graphType: "",
    listOfSeries: [],
    argumentAxis: "",
    title: "",
    aggregate: false,
    export: false,
    crosshair: false
  }

  onSubmit = (fields) => {
    this.setState({
      ...fields
    })
  }

  render(){
    return (
      <div className="App">
        <Form seriesOptions={seriesOptions} onSubmit={fields => this.onSubmit(fields)}/>
        <br/>
        <UrbanGraph data={data.gotData} graphType={this.state.graphType} 
          seriesList={this.state.listOfSeries} colourTheme="Bright" argumentAxis={this.state.argumentAxis} title={this.state.title}
          aggregate={this.state.aggregate} export={this.state.export} crosshair = {this.state.crosshair}
        />
        <br/>
        {/* <UG data={data.gotData} graphType={this.state.graphType} 
          seriesList={this.state.listOfSeries} colourTheme="Bright" argumentAxis={this.state.argumentAxis} title={this.state.title}
          aggregate={this.state.aggregate} export={this.state.export} crosshair = {this.state.crosshair}
        /> */}
      </div>
    );
  }
}

export default App;
