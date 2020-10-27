import React from 'react'


const graphTypeOptions = [
    { value: 'line', label: 'Line Graph' },
    { value: 'spline', label: 'Spline Chart' },
    { value: 'bar', label: 'Bar Graph' },
    { value: 'stackedBar', label: 'Stacked Bar Graph' },
    { value: 'area', label: 'Area Graph' },
    { value: 'pie', label: 'Pie Chart' },
    { value: 'doughnut', label: 'Doughnut Graph' },
  ]

class Form extends React.Component {
    state = {
        graphType: "",
        listOfSeries: [""],
        argumentAxis: ""
    }

    formBuild = (name, placeholder, options) => {
        return <div>
            {this.state[name].map((value, index)=>{
                return <div>
                    <select key={index} name={name} value={this.state[name][index]}
                        placeholder={placeholder} onChange={e=>this.changeSeries(e,index)}
                        style={{marginTop:"5px", marginBottom:"5px"}}>
                        {options.map((option, index)=>{
                            return <option key={index} value={option.value}>{option.label}</option>
                        })}
                    </select>
                    <button type="button" onClick={e=>this.removeSeries(e,index)} style={{marginLeft: "7px"}}
                        name={name}>Remove</button>
                </div>
            })}
            <button type="button" onClick={this.addNewSeries} name={name}>Add new Series</button>
        </div>
    }

    addNewSeries = (e) => {
        this.setState({
            [e.target.name]: [...this.state[e.target.name], ""]
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let objectToPass = {...this.state}
        for(let i=0; i<objectToPass.listOfSeries.length; i++){
            if(objectToPass.listOfSeries[i] === ""){
                objectToPass.listOfSeries[i] = this.props.seriesOptions[0].value
            }
        }
        // if (objectToPass.argumentAxis === "") objectToPass.argumentAxis = this.props.seriesOptions[0].value
        this.props.onSubmit(objectToPass)
    }

    changeSeries = (e,index) => {
        this.setState({
            [e.target.name]: [...this.state[e.target.name].slice(0,index), e.target.value, ...this.state[e.target.name].slice(index+1)] 
        })
    }

    removeSeries = (e, index) => {
        this.setState({
            [e.target.name]: [...this.state[e.target.name].slice(0,index), ...this.state[e.target.name].slice(index+1)]
        })
    }

    render(){
        return(
            <div style={{textAlign:"center", width:"100%", margin: "10px"}}>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label style={{paddingRight: "7px"}}>Type of Graph</label>
                        <select name="graphType" onChange={this.onChange} placeholder="Select Graph Type" value={this.state.graphType}>
                            {graphTypeOptions.map((option, index)=>{
                                return <option value={option.value} key={index}>{option.label}</option>
                            })}
                        </select>
                    </div>
                    <br/>
                    <div>
                        <label style={{paddingRight: "7px"}}>Argument Axis</label>
                        <select name="argumentAxis" value={this.state.argumentAxis} onChange={this.onChange} placeholder="Argument Axis">
                            {this.props.seriesOptions.map((option,index)=>{
                                return <option value={option.value} key={index}>{option.label}</option>
                            })}
                        </select>
                    </div>
                    <br/>
                    {this.formBuild("listOfSeries", "List of Series", this.props.seriesOptions)}
                    <br/>
                    <button style={{marginTop:"5px"}}>Make Graph</button>
                </form>
            </div>
        );
    }
}

export default Form