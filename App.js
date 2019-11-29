import React, { Component } from "react";
import Titles from "./components/titles";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "d6faa84b9dd9b7d009d430ab88d57eb3";



class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    min:undefined,
    max:undefined,
    date: new Date(),
    error: undefined
    
  };



  getWeather = async e => {
    const city = e.target.elements.city.value;
   
    e.preventDefault();
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await api_call.json();
    console.log(data);
    if (city) {
      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        min:data.main.temp_min,
        max:data.main.temp_max,
        error: ""
      });
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        min:undefined,
        max:undefined,
        error: "Please enter the values"
      });
    }
  };

  render() {
    return (
      <div>
        <div class="date">
        <p> Date: {this.state.date.toLocaleDateString()}</p></div>
        
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}
                    city={this.state.city}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    min={this.state.min}
                    max={this.state.max}
                    error={this.state.error}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
