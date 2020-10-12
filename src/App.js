import React from 'react';
import './App.css';
import UrbanGraph from './UrbanGraph/UrbanGraph'
import data from './data'

function App() {
  return (
    <div className="App">
      <UrbanGraph data={data.gotData}/>
    </div>
  );
}

export default App;
