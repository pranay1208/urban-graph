import React from 'react'


const graphTypeOptions = [
    { value: 'line', label: 'Line Graph' },
    { value: 'spline', label: 'Spline Chart' },
    { value: 'bar', label: 'Bar Graph' },
    { value: 'stackedBar', label: 'Stacked Bar Graph' },
    { value: 'area', label: 'Area Graph' },
  ]

class Form extends React.Component {
    state = {
        graphType: "",
        listOfSeries: [""]
    }

    addNewSeries = () => {
        this.setState({
            listOfSeries: [...this.state.listOfSeries, ""]
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        for(let i=0; i<this.state.listOfSeries.length; i++){
            if(this.state.listOfSeries[i] === ""){
                this.state.listOfSeries[i] = this.props.seriesOptions[0]
            }
        }
        this.props.onSubmit(this.state)
    }

    changeSeries = (e,index) => {
        this.setState({
            listOfSeries: [...this.state.listOfSeries.slice(0,index), e.target.value, ...this.state.listOfSeries.slice(index+1)] 
        })
    }

    removeSeries = index => {
        this.setState({
            listOfSeries: [...this.state.listOfSeries.slice(0,index), ...this.state.listOfSeries.slice(index+1)]
        })
    }

    render(){
        return(
            <div style={{textAlign:"center", width:"50%", margin: "10px"}}>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <select name="graphType" onChange={this.onChange} placeholder="Select Graph Type" value={this.state.graphType}>
                            {graphTypeOptions.map((option)=>{
                                return <option value={option.value}>{option.label}</option>
                            })}
                        </select>
                    </div>
                <br/>
                {this.state.listOfSeries.map((value, index)=>{
                    return <div>
                        <select key={index} name="listOfSerries" value={this.state.listOfSeries[index]}
                             placeholder="Graph series to track" onChange={e=>this.changeSeries(e,index)}
                             style={{marginTop:"5px", marginBottom:"5px"}}>
                            {this.props.seriesOptions.map((option, index)=>{
                                return <option key={index} value={option.value}>{option.label}</option>
                            })}
                        </select>
                        <button type="button" onClick={()=>this.removeSeries(index)} style={{marginLeft: "7px"}}>Remove</button>
                    </div>
                })}
                <br/>
                <button type="button" onClick={this.addNewSeries}>Add new Series</button>
                <br/>
                <button style={{marginTop:"5px"}}>Make Graph</button>
                </form>
            </div>
        );
    }
}

export default Form