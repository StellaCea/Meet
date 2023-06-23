import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import "./nprogress.css";
import NProgress  from 'nprogress';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import logo from "./meet-logo.png";
import EventGenre from './EventGenre';

class App extends Component {

  state = {
    events: [],
    locations: [],
    eventCount: 32,
    location: "all",
    selectedCity: null,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem("access_token");
    let isTokenValid;
    if (accessToken && !navigator.onLine){
      isTokenValid = true;
    } else {
      isTokenValid = (await checkToken(accessToken)).error ? false : true;
    }
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
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

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(", ").shift()
      return {city, number};
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
        <header className='header'>
          <div className='header_logo'>
            <img src={logo} width="200" alt='meet'></img>
          </div>
            <h4>Choose your nearest city</h4>
            <CitySearch locations={this.state.locations} updateEvents={this.      updateEvents} />
            <h4>Select number of events</h4>
            <NumberOfEvents 
              selectedCity={this.state.selectedCity}
              query={this.state.eventCount}
              updateEvents={this.updateEvents}
              numberOfEvents={numberOfEvents}
              />
        </header>
        <main>
          <div className='data-vis-wrapper'>
          <EventGenre events={this.state.events} />
          <h4>Events in each city</h4>
          <ResponsiveContainer height={400}>
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid />
              <XAxis type='category' dataKey="city" name='city' />
              <YAxis
                allowDecimals={false}
                type="number" dataKey="number" name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        {!navigator.onLine ? <WarningAlert text={"You're offline, events might not be up to date"} /> : null }
        <EventList events={this.state.events} />
        </main>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={()=> { getAccessToken() }} />
    </div>
    );
  }
}

export default App;
