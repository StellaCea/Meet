import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        query: 32,
    };

    handleInputChanged = async (event) => {
        const value = event.target.value;
        if(value >= 1 || value <= 32) {
            this.setState({
                query: value,
            });
            this.props.updateEvents(this.props.selectedCity, value);
        }
    };

    render () {
        return (
            <div className="numberOfEvents">
                <label htmlFor="eventCount">Select number of events</label>
                <input 
                    type="number"
                    className="numbOfEvents"
                    id="eventCount"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                />
            </div>
        );
    }
}
export default NumberOfEvents;