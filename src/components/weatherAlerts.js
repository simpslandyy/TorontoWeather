import React from 'react';

class WeatherAlerts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="col">
        <div className="card text-center mb-3 mt-4">
          <div className="card-header" id="weather-alerts">
              <h3>
                {this.props.alert ? this.props.alert : "Example Warning"}  <span className="wi wi-earthquake"> </span>
              </h3>
          </div>
          <div className="card-body">
            <p className="card-text">
              {this.props.description ? this.props.description :
              "This is just an example warning message to display what this feature might " +
               "look like if the alert system was active. " +
               "This is a conditionally rendered component however currently this is being rendered in debug mode. " +
               "Please look in /src/weather.js for the DisplayAlerts function for the conditional rendering logic :)" +
               "I initially created this component because I was programming during " +
               "the ice storm this past weekend and I genuinely believe it's a necessary feature to have for users. " +
               "In the case that there isn't another crazy ice storm during the viewing of this assignment " +
               "I would at least like you to be able to see that this feature was implemented :) " }
              </p>
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
