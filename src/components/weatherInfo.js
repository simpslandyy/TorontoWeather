import React from 'react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log({HERE: this.props})

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
          unit='mph'
          spanClass={"wi wi-wind towards-" + this.props.windBearing + "-deg"}/>

          <InfoCards
          title="Wind Gust"
          data={this.props.windGust}
          unit="mph"
          spanClass="wi wi-small-craft-advisory"/>

        </div>
      </div>
    )
  }
}


const InfoCards = (props) => {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{props.data + " " + props.unit} </h4>
          <h5 className="card-subtitle mb-2 text-muted"> {props.title}
           <span className={"ml-1 "+ props.spanClass}></span> </h5>
        </div>
      </div>
    </div>
  )
}

export { WeatherInfo }
