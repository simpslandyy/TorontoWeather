import React from 'react';
import { Temperature } from '../components/temperature';
import { WeatherInfo } from '../components/weatherInfo';
import { WeatherAlerts } from '../components/weatherAlerts';
import { Navigation } from '../components/navigation';
import { Forecast } from '../components/forecast';

import { getCurrently } from '../store/reducer';
import { toggleTemp, toggleSpeed } from '../store/action';
import { connect } from 'react-redux';

class TorontoWeather extends React.Component {
    constructor(props) {
      super(props);
    }

    render () {
      return (
        <div>
          <Navigation
          title={this.props.search}
          temp_unit={this.props.units.temp_unit}
          speed_unit={this.props.units.speed_unit}
          toggleTempUnit={this.props.toggleTempUnit}
          toggleSpeedUnit={this.props.toggleSpeedUnit}/>

          <div className="container weather-app-content">
          {DisplayAlerts(this.props.alerts, (this.props.alerts.alert ? true : false))}
              <div className="row" id="color-container">
                <Temperature
                temp_unit={this.props.units.temp_unit}
                soon={this.props.hourly.summary} {...this.props.current}/>
              </div>
              <div className="row">
                <WeatherInfo
                speed_unit={this.props.units.speed_unit}
                {...this.props.current} />
              </div>
                <Forecast
                temp_unit={this.props.units.temp_unit}
                speed_unit={this.props.units.speed_unit}
                {...this.props.hourly} />
          </div>
        </div>

      )}
}



const DisplayAlerts = (data, isAlert, debug=true) => {
  if (isAlert || debug) {
    return (
      <div className="row">
        <WeatherAlerts {...data} />
      </div>
      )
  }
  return null;
}

const mapStatetoProps = (state, props)  => {
    return {
      current: state.currently.toJSON(),
      hourly: state.hourly.toJSON(),
      alerts: state.alerts.toJSON(),
      units: state.units.toJSON()
    }
}

const mapDispatchtoProps = dispatch => {
  return {
    toggleTempUnit: (fromUnit, toUnit) => {
      dispatch(toggleTemp(fromUnit, toUnit))
    },
    toggleSpeedUnit: (fromUnit, toUnit) => {
      dispatch(toggleSpeed(fromUnit, toUnit))
    }
  }
}

const connected = connect(mapStatetoProps, mapDispatchtoProps)(TorontoWeather);

export { connected as TorontoWeather }
