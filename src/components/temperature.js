import React from 'react';
import { getCurrently, getMinutely, getAlerts } from '../store/reducer';


class Temperature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-4">
        <div className="card" id="temperature-content">
          <h1 className="card-title"> {Math.ceil(this.props.temp) + '°C'}<span className="wi-day-sunny"> </span> </h1>
          <h6 className="card-subtitle mb-2 text-muted"> {this.props.summary} </h6>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item text-muted"> {this.props.soon.summary} </li>
        </ul>

      </div>
    )
  }

}
//
// const backgroundIcon = () => {
//   switch(this.props.temp) {
//     case:
//
//   }
// }

export { Temperature };
