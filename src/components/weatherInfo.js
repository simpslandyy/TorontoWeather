import React from 'react';
import { allUnits } from '../constants'

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    console.log({HERE: this.props})

    let prettyUnit = this.props.speed_unit == allUnits.KPH ? "km/h" : allUnits.MPH;
    return (
      <div className="col-8">
        <div className="row">

          <InfoCards
          title="Humidity"
          data={this.props.humidity}
          unit="%"
          spanClass="wi wi-humidity"/>

          <InfoCards
          title="Wind"
          data={this.props.windSpeed}
          unit={prettyUnit}
          spanClass={"wi wi-wind towards-" + this.props.windBearing + "-deg"}/>

          <InfoCards
          title="Wind Gust"
          data={this.props.windGust}
          unit={prettyUnit}
          spanClass="wi wi-small-craft-advisory"/>

          <InfoCards
          title="POP"
          data={this.props.pop}
          unit="%"
          spanClass="wi wi-raindrop"/>

        </div>
      </div>
    )
  }
}


const InfoCards = (props) => {
  return (
    <div className="col-3">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">{props.data + " " + props.unit} </h3>
          <h6 className="card-subtitle mb-2 text-muted"> {props.title}
           <span className={"ml-1 "+ props.spanClass}></span> </h6>
        </div>
      </div>
    </div>
  )
}

export { WeatherInfo }
