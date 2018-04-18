import React from 'react';
import { SelectIcon } from './selectIcon';

class Temperature extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="center-temp">
        <div className="card mb-3 mt-3" id="temperature-content">
        <div className="card-body text-center">
          <h2 className="card-title">
            <span className={'mr-2 '+ SelectIcon(this.props)}> </span>
            {this.props.temp + "°" + this.props.temp_unit}
          </h2>
          <div className="card-subtitle pb-2"> Feels Like:
            <h5> {this.props.feelsLike + "°" + this.props.temp_unit} </h5>
          </div>
          <h6 className="card-subtitle text-muted" id="summary-subtitle"> {this.props.summary} </h6>
        </div>
        <div className="dropdown-divider"></div>
        <p className="card-text p-2">
        <span className="wi wi-time-2 mr-2"> </span>
        {this.props.soon} </p>
      </div>
      </div>
    )
  }

}




export { Temperature };
