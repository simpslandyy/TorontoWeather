import React from 'react';

class WeatherInfo extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col-8">
        <div className="row">
          <InfoCards title="Humidity" data={this.props.humidity} unit=""/>
          <InfoCards title="Wind Speed" data={this.props.windSpeed} unit='mph' />
          <InfoCards title="Wind Gust" data={this.props.windGust} unit="mph"/>

        </div>
      </div>
    )
  }
}


const InfoCards = (props) => {
  return (
    <div className="col-sm-4">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{props.data + " " + props.unit}</h4>
          <h6 className="card-subtitle mb-2 text-muted"> {props.title} </h6>


        </div>
      </div>
    </div>
  )
}

export { WeatherInfo }
