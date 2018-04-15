import React from 'react';

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (event) {
    console.log({HANDLER: this.props})
    event.preventDefault();
    let id = event.target.id;
    let unitValue = id.split('-')[1];
    let currValue = this.props.temp_unit;
    switch(unitValue) {
      case 'F':
      case 'C':
        console.log("HANDLING " + unitValue)
        this.props.toggleTempUnit(currValue, unitValue);
        break;
      case 'kph':
      case 'mph':
        this.props.toggleSpeedUnit(currValue, unitValue)
        break;
    }
  }

  render() {
    console.log({NAV: this.props})
    return (
      <div className="navbar navbar-light">
          <a className="navbar-brand">
            <h1>{this.props.title}</h1>
          </a>

          <div className="btn-toolbar" role="toolbar" aria-label="units-toolbar">
            <div className="btn-group mr-2"
            role="group"
            aria-label="temp-units"
            onClick={this.handleClick}>
              <button
              type="button"
              className={"btn btn-secondary " + (this.props.temp_unit == "F" ? "active" : "")}
              id="unit-F"> °F </button>

              <button
              type="button"
              className={"btn btn-secondary " + (this.props.temp_unit == "C" ? "active" : "")}
              id="unit-C"> °C </button>
            </div>

            <div className="btn-group mr-2"
            role="group"
            aria-label="speed-units"
            onClick={this.handleClick}>
              <button
              type="button"
              className={"btn btn-secondary " + (this.props.speed_unit == "mph" ? "active" : "")}
              id="unit-mph"> mph </button>

              <button
              type="button"
              className={"btn btn-secondary " + (this.props.speed_unit == "kph" ? "active" : "")}
              id="unit-kph"> km/h </button>

            </div>
          </div>
        </div>
    )
  }
}

export { Navigation }
