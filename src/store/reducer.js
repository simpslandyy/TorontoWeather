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

const hourlyIS = Map({
  summary: "",
  forecast: []
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
    .set('windBearing', data.windBearing)
    .set('pop', (precipProbability * 100));
};

const parseHourly = (state, data) => {
  // save the next 5 hours.
  let futureBlock = data.data.slice(1, 6);
  let bundle = [];

  futureBlock.map((forecast) => {
    let d = new Date(forecast.time * 1000);
    var block = {
      icon: forecast.icon,
      humidity: (forecast.humidity * 100),
      temp: Math.ceil(forecast.temperature),
      time: moment(d).format('LT'),
      summary: forecast.summary,
      windGust: Math.ceil(forecast.windGust),
      windSpeed: Math.ceil(forecast.windSpeed),
      pop: (forecast.precipProbability * 100),
      feelsLike: Math.ceil(forecast.apparentTemperature)
    }

    bundle.push(block);
  })

  return state.set('summary', data.summary).set('forecast', bundle);
};

const parseAlerts = (state, data) => {
  return state.set('alert', data.title)
      .set('regions', data.regions)
      .set('warning_level', data.severity)
      .set('description', data.description);
};

export const units = (state = unitsIS, action = {}) => {
  switch(action.type) {
    case types.TO_MPH:
      return state.set('speed_unit', 'mph');
    case types.TO_KPH:
      return state.set('speed_unit', 'kph');
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

    case types.TO_MPH:
      var windSpeed = state.get('windSpeed');
      var windGust = state.get('windGust');
      const TOMPH = 0.621371;

      return state.set('windGust', Math.ceil(windGust * TOMPH)).set('windSpeed', Math.ceil(windSpeed * TOMPH))

    case types.TO_KPH:
      var windSpeed = state.get('windSpeed');
      var windGust = state.get('windGust');
      const TOKPH = 1.60934 ;

      return state.set('windGust', Math.ceil(windGust * TOKPH)).set('windSpeed', Math.ceil(windSpeed * TOKPH))

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

export const hourly = (state = hourlyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return action.data.hourly ? parseHourly(state, action.data.hourly) : state;
    default:
      return state;
  }
};

/**
  Fix alerts => save a list of alerts.
**/
export const alerts = (state = alertsIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      if (action.data.alerts) {
        if (action.data.alerts.length > 0) {
          if (action.data.alerts.length > 1){
            let alertBlock = action.data.alerts[0];
            var alertBlockB = action.data.alerts[1];

            alertBlock = alertBlock.description.length > alertBlockB.description.length ? alertBlock : alertBlockB;
            return parseAlerts(state, alertBlock);
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
