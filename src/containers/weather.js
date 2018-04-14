import React from 'react';
import { Temperature } from '../components/temperature';
import { WeatherInfo } from '../components/weatherInfo';
import { getCurrently } from '../store/reducer';
import { connect } from 'react-redux';

class TorontoWeather extends React.Component {
    constructor(props) {
      super(props);
    }

    render () {
      return (
        <div>
          <div className="row">
            <h1> {this.props.search} </h1>
          </div>
          <div className="row">
            <WeatherInfo  {...this.props.current} />
            <Temperature soon={this.props.soon} {...this.props.current}/>
        </div>
      </div>);
      }

}


const mapStatetoProps = (state, props)  => {
    return {
      current: state.currently.toJSON(),
      soon: state.minutely.toJSON()
    }
}

const connected = connect(mapStatetoProps, null)(TorontoWeather);

export { connected as TorontoWeather }
