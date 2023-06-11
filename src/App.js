import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import "./nprogress.css";
import NProgress  from 'nprogress';

class App extends Component {

  state = {
    events: [],
    locations: [],
    eventCount: 32,
    location: "all",
    selectedCity: null
  }

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        const shownEvents = events.slice(this.state.eventCount);
        this.setState({ events: shownEvents, locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (!eventCount) {
      getEvents().then((events) => {
        const locationEvents =
          location === "all"
            ? events
            : events.filter((event) => event.location === location);
        const shownEvents = locationEvents.slice(0, this.state.eventCount);
        this.setState({
          events: shownEvents,
          selectedCity: location
        });
      });
    } else if (eventCount && !location) {
      getEvents().then((events) => {
        const locationEvents = events.filter((event) =>
          this.state.locations.includes(event.location)
        );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount
        });
      });
    } else if (this.state.selectedCity === "all") {
      getEvents().then((events) => {
        const locationEvents = events;
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    } else{
      getEvents().then((events)=> {
        const locationEvents =
          this.state.locations === "all"
            ? events
            :events.filter(
              (event) => this.state.selectedCity === event.location
            );
        const shownEvents = locationEvents.slice(0, eventCount);
        this.setState({
          events: shownEvents,
          eventCount: eventCount,
        });
      });
    }
  };

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <EventList events={this.state.events} />
        <NumberOfEvents 
          selectedCity={this.state.selectedCity}
          query={this.state.eventCount}
          updateEvents={this.updateEvents} />
    </div>
    );
  }
}

export default App;
