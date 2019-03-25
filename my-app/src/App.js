import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  fetchSpaceXAPI =() =>{
    var randomnumber = Math.floor(Math.random() * (69 - 1 + 1)) + 1;
    fetch("https://api.spacexdata.com/v3/launches/" + randomnumber)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            flightNumber: result.flight_number,
            missionName: result.mission_name,
            rocketName: result.rocket.rocket_name
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
      this.fetchSpaceXAPI();
  }
  
  render() {
    const { error, isLoaded, flightNumber, missionName, rocketName } = this.state;
    if (error) {
      return 'Error';
    } else if (!isLoaded) {
      return 'Loading';
    } else {
      return (
        <div>
      <div className="searchBox">
          <div className="flightInfo">
              <div className="title">
                  FLIGHT INFO
              </div>
              <div className="results">
                  <ul>
                      <li><span className="dot"></span> Launch: {flightNumber}</li>
                      <li><span className="dot"></span> Mission name: {missionName}</li>
                      <li><span className="dot"></span> Rocket: {rocketName}</li>
                  </ul>
              </div>
          </div>
          <button onClick={this.fetchSpaceXAPI}> Get random flight</button>
      </div>
     </div> 
    );
  }
}
}



export default App;
