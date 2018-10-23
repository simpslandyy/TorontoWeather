import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from './store/reducer';
import { TorontoWeather } from './containers/weather';
import { Search } from './containers/search';
import { fetchWeather } from './store/action';

import "regenerator-runtime/runtime"; //async await
import './_custom.scss';
import 'bootstrap';
import '../assets/stylesheets/css/weather-icons.css';
import '../assets/stylesheets/css/weather-icons-wind.css';


const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

store.subscribe(() => {
  console.log(store.getState())
})

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getWeather();
  }

  render () {
    return (<Search />)
    }
}

const mapDispatchtoProps = dispatch => {
  return {
    getWeather: () => {
      dispatch(fetchWeather('Toronto, ON'));
    }
  }
}

const mapStatetoProps = state => {
  return {
    search: 'Toronto, ON'
  }
}


const WeatherApp = connect(mapStatetoProps, mapDispatchtoProps)(App);



ReactDOM.render(
  <Provider store={store}>
    <WeatherApp />
  </Provider>,
  document.getElementById('root')
);
