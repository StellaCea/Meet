import React, { Component } from "react";

class Event extends Component {
    state = { collapsed: true };

    handleItemClick = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };

    render () {
        const { event } = this.props;
        const { collapsed } = this.state;
        return (
            <div className="event">
                <h2 className="title">Summary: {event.summary}</h2>
                {this.state.collapsed === false && (
                    <ul className="details">
                        <li>Description: {event.description}</li>
                        <li>Location: {event.location}</li>
                        <li>Start: {new Date(event.start.dateTime).toISOString()}</li>
                        <li>End: {new Date(event.end.dateTime).toISOString()}</li>
                    </ul>
                )}
                <br />
                <button 
                    className="details-btn"
                    onClick={() => this.handleItemClick()}
                    >Details</button>

            </div>
        )
    }
}
export default Event;