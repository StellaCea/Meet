import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 32,
    };

    handleInputChanged = (event) => {
        this.setState({query: event.target.value});
    }

    render () {
        return (
            <div className="numberOfEvents">
                <input 
                    type="number"
                    className="numbOfEvents"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}
export default NumberOfEvents;