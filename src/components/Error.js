import React,{Component} from 'react';

class Error extends Component{
    render(){
        return(
            <div className="error">
                <input type="button" id="icon" value="close"/>
                <p>please write valid expression.</p>
            </div>
        );
    }
}

export default Error;