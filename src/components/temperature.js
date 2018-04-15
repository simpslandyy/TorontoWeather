import React from 'react';
import { getCurrently, getMinutely, getAlerts } from '../store/reducer';


class Temperature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-4">
        <div className="card mb-3" id="temperature-content">
        <div className="card-body text-center">
          <h1 className="card-title">
          <span className={'mr-2 '+ SelectIcon(this.props)}> </span>
          {this.props.temp + "°" + this.props.temp_unit}
          </h1>
          <p className="card-subtitle pb-2"> Feels Like:
            <h5 id="temperature-header"> {this.props.feelsLike + "°" + this.props.temp_unit} </h5>
          </p>
          <h6 className="card-subtitle text-muted"> {this.props.summary} </h6>
        </div>
        <div className="dropdown-divider"></div>
        <p className="card-text p-2">
        <span className="wi wi-time-2 mr-2"> </span>
        {this.props.soon.summary} </p>
      </div>
      </div>
    )
  }

}



const SelectIcon = (props) => {
  switch(props.icon) {
    case 'clear-day':
      return 'wi wi-day-sunny';
    case 'clear-night':
      return 'wi wi-night-clear';
    case 'rain':
      return 'wi wi-showers';
    case 'snow':
      return 'wi wi-snow';
    case 'sleet':
      return 'wi wi-sleet';
    case 'wind':
      return 'wi wi-strong-wind';
    case 'fog':
      return 'wi wi-fog';
    case 'cloudy':
      return 'wi wi-cloud';
    case 'partly-cloudy-day':
      return 'wi wi-day-cloudy'
    case 'partly-cloudy-night':
      return 'wi wi-night-partly-cloudy'
    case 'hail':
      return 'wi wi-hail';
    case 'thunderstorm':
      return 'wi wi-thunderstorm';
    case 'tornado':
      return 'wi wi-tornado';
    default:
      return ""
  }
}

export { Temperature };
