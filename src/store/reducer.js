import Immutable from 'immutable';
import { types } from '../constants';

const { Map } = Immutable;

const currentlyIS = Map({
  time: null,
  summary: "",
  icon: "",
  temp: 0,
  feelsLike: 0,
  humidity: 0,
  windSpeed: 0,
  windGust: 0
});

const minutelyIS = Map({
  summary: ""
});

const alertsIS = Map({
  alert: "",
  regions: "",
  warning_level: "",
  description: ""
});

const parseCurrently = (state, data) => {
  return state.set('summary', data.summary)
    .set('icon', data.icon)
    .set('temp', data.temperature)
    .set('feelsLike', data.apparentTemperature)
    .set('humidity', data.humidity)
    .set('windSpeed', data.windSpeed)
    .set('windGust', data.windGust);
};

const parseMinutely = (state, data) => {
  return state.set('summary', data.summary);
};

const parseAlerts = (state, data) => {
  return state.set('alert', data.title)
      .set('regions', data.regions)
      .set('warning_level', data.severity)
      .set('description', data.description);
};

export const currently = (state = currentlyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return parseCurrently(state, action.data.currently);
    default:
      return state;
  }
};

export const minutely = (state = minutelyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return parseMinutely(state, action.data.minutely);
    default:
      return state;
  }
};

export const alerts = (state = alertsIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      if (action.data.alerts.length > 0) {
        if (action.data.alerts.length > 1){
          return parseAlerts(state, action.data.alerts[1]);
        } else {
          return parseAlerts(state, action.data.alerts[0]);
        }
      }
      break;
    default:
      return state;
  }
};


// export const getCurrently = (state = currentlyIS) => {
//   console.log(state)
//   if (state.isEmpty()) {
//     return {};
//   }
//
//   return state.toJSON();
// }

// export const getMinutely = (state) => {
//   if(!state || state.isEmpty()) {
//     return {};
//   }
//   return state.toJSON();
// }
//
// export const getAlerts = (state) => {
//   if(!state || state.isEmpty()) {
//     return {};
//   }
//
//   return state.toJSON();
// }
