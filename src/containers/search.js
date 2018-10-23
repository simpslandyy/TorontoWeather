import React from 'react';
import { connect } from 'react-redux';
import { TorontoWeather } from './weather';
import { fetchWeather } from '../store/action';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.handleForm = this.handleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {search: "", loading: false};
  }

  handleChange(event) {
    this.setState({ search: event.target.value })
  }

  handleForm(event) {
    event.preventDefault();
    this.props.getWeather(this.state.search);
  }

  render() {
    let { success } = this.props.search;
    return (
      <div>
        <form onSubmit={this.handleForm}>
            <div className="input-group input-group-lg">
              <input type="text" className="form-control" onChange={this.handleChange} aria-label="Search for weather ..." />
              <button type="submit" className="btn btn-primary"> Submit </button>
            </div>
        </form>
        {(this.success && <TorontoWeather {...this.props}/>) }
      </div>
    )
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    getWeather: (location) => {
      dispatch(fetchWeather(location))
    }
  }
}

const mapStatetoProps = state => {
  return {
    search: state.search.toJSON(),
  }
}

const connected = connect(mapStatetoProps, mapDispatchtoProps)(Search);
export { connected as Search };
