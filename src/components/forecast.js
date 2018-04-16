import React from 'react';
import moment from 'moment';
import { SelectIcon } from './selectIcon';

class Forecast extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log({FORECAST: this.props})
    return (
      <div className="row">
          <div className="card-deck mt-5 mb-3" id="forecast-group">
            {this.props.forecast.map((hourF) =>
              <Hour temp_unit={this.props.temp_unit} speed_unit={this.props.speed_unit} {...hourF}/>
            )}
          </div>
      </div>
    )
  }
}


const Hour = (props) => {
  console.log({HOUR: props})
 return (
      <div className="card">
      <div className="card-body">
      <p className="card-subtitle text-center text-muted"> {props.time}</p>
      <p className="card-subtitle text-center" id="summary-subtitle"> {props.summary} </p>
      <h3 className="card-title text-center m-5">
      <span className={'mr-2 ' + SelectIcon(props)}> </span>
        {props.temp + "°" + props.temp_unit}
      </h3>
      <div className="dropdown-divider"></div>

      <Subtitle title="Feels Like" data={props.feelsLike + "°" + props.temp_unit} />
      <Subtitle title="Humidity" data={props.humidity + "%"} />
      <Subtitle title="POP" data={props.pop + '%'} />
      <Subtitle title="Wind" data={props.windSpeed + " " + props.speed_unit} />
      <Subtitle title="Gust" data={props.windGust + " " + props.speed_unit} />
      </div>
      </div>
  )

}

const Subtitle = (props) => {
  return (
    <p className="card-subtitle pt-2 text-muted">
      {props.title + ": " + props.data}
    </p>
  )
}

export { Forecast };
