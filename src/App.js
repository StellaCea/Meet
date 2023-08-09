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
import Header from './Header';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import EventGenre from './EventGenre';


class App extends Component {

  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    location: "all",
    selectedCity: null,
    showWelcomeScreen: undefined
  }

    getData = () => {
      const {locations, events} = this.state;
      const data = locations.map((location) => {
        const number = events.filter((event) => event.location === location).length;
        const city = location.split(", ").shift()
        return { city, number };
      })
      return data;
    };

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
          events = events.slice(0, this.state.numberOfEvents);
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location, eventCount) => {
    if (location) this.setState({ location });
    if (eventCount ) this.setState({ numberOfEvents: eventCount });
    getEvents().then((events) => {
      const locationEvents = (this.state.location === "all") ?
        events:
        events.filter((event) => event.location === this.state.location);
      this.setState({
        events: locationEvents.slice(0, this.state.numberOfEvents)
      });
    });
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className='App' />
    return (
      <div className="App">
        <Header />
        
        <div className='container-upper'>
          <p>Choose your nearest city</p>
          <CitySearch 
            locations={this.state.locations} 
            updateEvents={this.updateEvents} />

          <NumberOfEvents 
            updateEvents={this.updateEvents}
            />
        </div>

        <main>
          <div className='data-vis-wrapper'>
            <EventGenre events={this.state.events} />
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
