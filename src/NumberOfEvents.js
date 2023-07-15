import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
    state = {
        query: 32,
        errorText:""
    };

    handleInputChanged = async (event) => {
        const value = event.target.value;
        if(value >= 1 && value <= 32) {
            this.setState({
                query: value,
                errorText: "",
            });
            this.props.updateEvents(this.props.selectedCity, value);
        } else{
            this.setState({
                query: value,
                errorText: "Please enter a valid number"
            });
        }
    };

    render () {
        return (
            <div className="NumberOfEvents-container">
                <div>Number of Events</div>
                
                <label htmlFor="eventCount" className="field">Select number of events</label>
                <input 
                    type="number"
                    className="numbOfEvents"
                    min={1}
                    max={32}
                    id="eventCount"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                />
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}
export default NumberOfEvents;