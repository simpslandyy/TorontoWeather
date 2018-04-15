import React from 'react';
import { Temperature } from '../components/temperature';
import { WeatherInfo } from '../components/weatherInfo';
import { WeatherAlerts } from '../components/weatherAlerts';

import { getCurrently } from '../store/reducer';
import { toggleTemp } from '../store/action';
import { connect } from 'react-redux';

class TorontoWeather extends React.Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }

    handleClick (event) {
      console.log({HANDLER: this.props})
      event.preventDefault();
      let id = event.target.id;
      let unitValue = id.split('-')[1];
      let currValue = this.props.units.temp_unit;
      switch(unitValue) {
        case 'F':
        case 'C':
          console.log("HANDLING " + unitValue)
          this.props.toggleTempUnit(currValue, unitValue);
          break;
        case 'kph':
        case 'mph':
          console.log("Conversion here");
          break;
      }
    }

    render () {
      return (

        <div className="container">
            <Navigation handler={this.handleClick} title={this.props.search} temp_unit={this.props.units.temp_unit} speed_unit={this.props.units.speed_unit}/>
            <div className="row">
              <WeatherInfo  {...this.props.current} />
              <Temperature temp_unit={this.props.units.temp_unit} soon={this.props.soon} {...this.props.current}/>
            </div>
              {DisplayAlerts(this.props.alerts, (this.props.alerts.alert ? true : false))}
        </div>


      )}
}

const DisplayAlerts = (data, isAlert = false) => {
  if (isAlert) {
    return (
      <div className="row">
        <WeatherAlerts {...data} />
      </div>
      )
  }
  return null;
}
const Navigation = (props) => {
  console.log(props)
  return (
    <div className="navbar navbar-light">
        <a className="navbar-brand">
          <h1>{props.title}</h1>
        </a>
        <div className="btn-group ml-2 my-lg-0"
        role="group"
        aria-label="temp-units"
        onClick={props.handler}>

          <button
          type="button"
          className={"btn btn-secondary " + (props.temp_unit == "F" ? "active" : "")}
          id="unit-F"> °F </button>

          <button
          type="button"
          className={"btn btn-secondary " + (props.temp_unit == "C" ? "active" : "")}
          id="unit-C"> °C </button>

        </div>
    </div>
  )
}

const mapStatetoProps = (state, props)  => {
    return {
      current: state.currently.toJSON(),
      soon: state.minutely.toJSON(),
      alerts: state.alerts.toJSON(),
      units: state.units.toJSON()
    }
}

const mapDispatchtoProps = dispatch => {
  return {
    toggleTempUnit: (fromUnit, toUnit) => {
      dispatch(toggleTemp(fromUnit, toUnit))
    }
  }
}

const connected = connect(mapStatetoProps, mapDispatchtoProps)(TorontoWeather);

export { connected as TorontoWeather }
