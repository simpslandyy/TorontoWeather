import React from 'react';
import { Temperature } from '../components/temperature';
import { WeatherInfo } from '../components/weatherInfo';
import { WeatherAlerts } from '../components/weatherAlerts';

import { getCurrently } from '../store/reducer';
import { connect } from 'react-redux';

class TorontoWeather extends React.Component {
    constructor(props) {
      super(props);
    }

    render () {
      return (

        <div className="container">
            <Navigation title={this.props.search} />
            <div className="row">
              <WeatherInfo  {...this.props.current} />
              <Temperature soon={this.props.soon} {...this.props.current}/>
            </div>
            <div className="row">
              <WeatherAlerts {...this.props.alerts} />
            </div>
        </div>


      )}
}


const Navigation = (props) => {
  return (
    <div className="navbar navbar-light">
        <a className="navbar-brand">
          <h1>{props.title}</h1>
        </a>
        <div className="btn-group my-2 my-lg-0" role="group" aria-label="units">
        <button type="button" className="btn btn-secondary" checked> °C </button>
        <button type="button" className="btn btn-secondary"> °F </button>
        </div>
    </div>
  )
}

const mapStatetoProps = (state, props)  => {
    return {
      current: state.currently.toJSON(),
      soon: state.minutely.toJSON(),
      alerts: state.alerts.toJSON()
    }
}

const connected = connect(mapStatetoProps, null)(TorontoWeather);

export { connected as TorontoWeather }
