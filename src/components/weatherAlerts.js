import React from 'react';

class WeatherAlerts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col">
        <div className="card text-center">
          <div className="card-header" id="weather-alerts">
              <h5>
                {this.props.alert}  <span className="wi wi-earthquake"> </span>
              </h5>
          </div>
          <div className="card-body">
            <p className="card-text"> {this.props.description} </p>
          </div>
        </div>
      </div>
    )
  }
}


// <div className="card text-center">
//   <div className="card-header" id="weather-alerts">
//       {this.props.warning_level}
//   </div>
//   <div className="card-body">
//     <h5 className="card-title"> {this.props.alert} </h5>
//     <p className="card-text"> {this.props.description} </p>
//   </div>
// <div>

export { WeatherAlerts }
