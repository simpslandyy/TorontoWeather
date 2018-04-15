import Immutable from 'immutable';
import  moment  from 'moment';
import { types } from '../constants';
const { Map } = Immutable;

const currentlyIS = Map({
  time: null,
  date: null,
  summary: "",
  icon: "",
  temp: 0,
  feelsLike: 0,
  humidity: 0,
  windSpeed: 0,
  windGust: 0,
  windBearing: 0
});

const minutelyIS = Map({
  summary: ""
});

const alertsIS = Map({
  alert: "",
  regions: [],
  warning_level: "",
  description: ""
});


const unitsIS = Map({
  temp_unit: "F",
  speed_unit: "mph"
})

const parseCurrently = (state, data) => {
  //conver windSpeed from mph to kph
  return state.set('summary', data.summary)
    .set('icon', data.icon)
    .set('temp', Math.ceil(data.temperature))
    .set('feelsLike', Math.ceil(data.apparentTemperature))
    .set('humidity', (data.humidity * 100))
    .set('windSpeed', Math.ceil(data.windSpeed))
    .set('windGust', Math.ceil(data.windGust))
    .set('windBearing', data.windBearing);
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

export const units = (state = unitsIS, action = {}) => {
  switch(action.type) {
    // case types.TO_MPH:
    //
    // case types.TO_KPH:

    case types.TO_CELSIUS:
      return state.set('temp_unit', 'C');
    case types.TO_FAHREN:
      return state.set('temp_unit', 'F');
    default:
      return state;
  }
}
export const currently = (state = currentlyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return action.data.currently ? parseCurrently(state, action.data.currently) : state;

    case types.TO_CELSIUS:
      var temp = state.get('temp');
      var feelsLike = state.get('feelsLike');
      return state.set('temp', Math.ceil((temp - 32) * 5/9)).set('feelsLike', Math.ceil((feelsLike - 32) * 5/9));

    case types.TO_FAHREN:
      var temp = state.get('temp');
      var feelsLike = state.get('feelsLike');
      return state.set('temp', Math.ceil((temp * 9/5) + 32)).set('feelsLike', Math.ceil((feelsLike * 9/5) + 32));

    default:
      return state;
  }
};

export const minutely = (state = minutelyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return action.data.minutely ? parseMinutely(state, action.data.minutely) : parseMinutely(state, action.data.hourly);
    default:
      return state;
  }
};

export const alerts = (state = alertsIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      if (action.data.alerts) {
        if (action.data.alerts.length > 0) {
          if (action.data.alerts.length > 1){
            return parseAlerts(state, action.data.alerts[1]);
          } else {
            return parseAlerts(state, action.data.alerts[0]);
          }
        }
      }
      return state;
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
