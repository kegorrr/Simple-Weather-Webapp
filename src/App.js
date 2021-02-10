import React from 'react';
import './App.css';
import DayCard from "./components/DayCard/DayCard";
import HourCard from "./components/HourCard/HourCard";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"


export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
        lat: '',
        lon: '',
        current: [],
        hourly: [],
        daily: [],
        city: '',
        warnings: [],
        textFieldValue: ''
    };
  }

  componentDidMount() {
    this.APICall('Durham')
  }

  async APICall(location) {
    if(location !== '') {
      await Promise.resolve(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=<API KEY>`)
        .then(res => res.json())
        .then(
          (result) => {
            if(result.cod !== "404" && result.coord !== null) {
              this.setState(
                {
                  lat: result.coord.lat,
                  lon: result.coord.lon,
                  city: result.name
                }
              )
            }
          },
          (error) => {
            this.setState({
              error
            });
          }
        )
      )
      if(this.state.lat !== null && this.state.lon !== null) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&appid=<API KEY>&units=imperial`
        fetch(url)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState(
                    {
                      hourly: result.hourly,
                      daily: result.daily,
                      warnings: result.alerts,
                      current: result.current,
                    }
                )
              },
              (error) => {
                this.setState({
                  error
                });
              }
            )
      }
    }
  }

  handleChange = (e) => this.setState({ 
    textFieldValue: e.target.value 
  }) 

  keyPress = (e) => {
    if(e.keyCode === 13){
      this.APICall(this.state.textFieldValue)
    }
  }

  render() {
    const hours = this.state.hourly
    const days = this.state.daily

    return (
      <div>
        <header style={{display: 'flex', justifyContent: 'center', color: 'white', marginTop: '5%'}}>
          <h1>Weather Application</h1>
        </header>
        <div class="centered" style={{display: 'flex', justifyContent: 'center', marginBottom: '1.5em'}}>
          <TextField 
            style={{marginRight: '.75em'}} 
            onKeyDown={this.keyPress}
            value={this.state.textFieldValue}
            onChange={this.handleChange}
            label="City"
          />
          <Button onClick={() => this.APICall(this.state.textFieldValue)} style={{color: 'white', fontWeight: 'bold'}}>Submit</Button>
        </div>
        {
          (this.state.city !== '' && this.state.city !== null)
          ? <div id="current-weather" style={{display: 'flex', justifyContent: 'center', marginBottom: '1.5em', color: "white", fontWeight: 'bold'}}>
                 Currently, it is {Math.round(this.state.current.temp)}° in {this.state.city}.
            </div>
          : null
        }
        {
          (this.state.city !== '' && this.state.city !== null)
          ? <div>
              <h2 style={{display: 'flex', justifyContent: 'center', color: 'white'}}>Hourly Forecast</h2>
              <div id="day-forecast" style={{display: 'flex', justifyContent: 'center',  marginBottom: '1.5em'}}>
                {hours.slice(0,7).map(hour => 
                  <HourCard key={hour.dt} hourData={hour}/>)
                }
              </div>
              <h2 style={{display: 'flex', justifyContent: 'center', color: 'white'}}>Daily Forecast</h2>
              <div id="week-forecast" style={{display: 'flex', justifyContent: 'center',  marginBottom: '1.5em'}}>
                {days.slice(0,8).map(day => 
                  <DayCard key={day.dt} dayData={day}/>)
                }
              </div>
            </div>
          : null
        }
      </div>
    );
  }
}
