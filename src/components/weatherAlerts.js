import React from 'react';

class WeatherAlerts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log({HERE: this.props})
    return (
      <div className="col-8">
        <div className="card text-center">
          <div className="card-header" id="weather-alerts">
              {this.props.alert}
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
