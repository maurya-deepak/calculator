import React,{Component} from 'react';

class Finance extends Component{
    state={
        arr:['5','10','20']
    }
    change = ()=>{
        const newarr = [...this.state.arr];
        newarr.push("100000");
        this.setState({
            arr:newarr
        })
        console.log(this.state.arr)
    }
    render(){
        var classnames = "Finance-container container";
        return(
            <div className={classnames}>
                <h1>length = {this.state.arr.length} element=  {this.state.arr.join(" ")}</h1>
                <button onClick={this.change}>click me</button>
            </div>
        );
    }
}
export default Finance;