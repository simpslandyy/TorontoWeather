import React from 'react';
import { allUnits } from '../constants';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  /*
    Handles the button click events.
  */
  handleClick (event) {
    event.preventDefault();

    // extract the unit of measurement from the ID
    let id = event.target.id;
    let unitValue = id.split('-')[1];

    // Triggers the appropriate action/function based on the button that triggered this handler
    switch(unitValue) {
      case allUnits.FAH:
      case allUnits.CELSIUS:
        var currValue = this.props.temp_unit;
        this.props.toggleTempUnit(currValue, unitValue);
        break;

      case allUnits.KPH:
      case allUnits.MPH:
        var currValue = this.props.speed_unit;
        this.props.toggleSpeedUnit(currValue, unitValue)
        break;
    }
  }


  render() {
    return (
      <div className="navbar fixed-top navbar-light" id="weather-nav">
          <a className="navbar-brand">
              <span className="wi wi-thermometer mr-2"> </span>
              <h1>
                {this.props.title}
              </h1>
          </a>

          <div className="btn-toolbar" role="toolbar" aria-label="units-toolbar">
            <div className="btn-group mr-2"
            role="group"
            aria-label="temp-units"
            onClick={this.handleClick}>
              <button
              type="button"
              className={"btn btn-light " + (this.props.temp_unit == allUnits.FAH ? "active" : "")}
              id="unit-F"> °F </button>

              <button
              type="button"
              className={"btn btn-light " + (this.props.temp_unit == allUnits.CELSIUS ? "active" : "")}
              id="unit-C"> °C </button>
            </div>

            <div className="btn-group mr-2"
            role="group"
            aria-label="speed-units"
            onClick={this.handleClick}>
              <button
              type="button"
              className={"btn btn-light " + (this.props.speed_unit == "mph" ? "active" : "")}
              id="unit-mph"> mph </button>

              <button
              type="button"
              className={"btn btn-light " + (this.props.speed_unit == "kph" ? "active" : "")}
              id="unit-kph"> km/h </button>

            </div>
          </div>
        </div>
    )
  }
}

export { Navigation }
