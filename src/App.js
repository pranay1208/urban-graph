import React from 'react';
import './App.css';
import UrbanGraph from './UrbanGraph/UrbanGraph'
import data from './data'
import Form from './Helpers/Form'



const seriesOptions = Object.keys(data.gotData[1]).map((value)=>{
  return {
    value: value,
    label: value
  }
})


class App extends React.Component {

  state = {
    graphType: "",
    listOfSeries: []
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
          seriesList={this.state.listOfSeries} colourTheme=""/>
      </div>
    );
  }
}

export default App;
