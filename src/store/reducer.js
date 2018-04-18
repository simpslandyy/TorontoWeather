import Immutable from 'immutable';
import  moment  from 'moment';
import { types, allUnits } from '../constants';
const { Map } = Immutable;

/*--------------------------- INITIAL STATES ---------------------------*/
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
  windBearing: 0,
  pop: 0
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


/*--------------------------- PARSERS ---------------------------*/

const parseCurrently = (state, data) => {
  return state.set('summary', data.summary)
    .set('icon', data.icon)
    .set('temp', Math.ceil(data.temperature))
    .set('feelsLike', Math.ceil(data.apparentTemperature))
    .set('humidity', (data.humidity * 100))
    .set('windSpeed', Math.ceil(data.windSpeed))
    .set('windGust', Math.ceil(data.windGust))
    .set('windBearing', data.windBearing)
    .set('pop', (data.precipProbability * 100));
};

const parseHourly = (state, data) => {
  // save the next 5 hours.
  let futureBlock = data.data.slice(1, 6);
  let bundle = [];

  // For each block, parse the data similar to the format of currently
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


/*--------------------------- REDUCERS ---------------------------*/
export const units = (state = unitsIS, action = {}) => {
  switch(action.type) {
    case types.TO_MPH:
      return state.set('speed_unit', allUnits.MPH);
    case types.TO_KPH:
      return state.set('speed_unit', allUnits.KPH);
    case types.TO_CELSIUS:
      return state.set('temp_unit', allUnits.CELSIUS);
    case types.TO_FAHREN:
      return state.set('temp_unit', allUnits.FAH);
    default:
      return state;
  }
}

export const currently = (state = currentlyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      return action.data.currently ? parseCurrently(state, action.data.currently) : state;

    // on conversions, get the current state,
    // and preform the conversions for the appropriate data fields
    case types.TO_MPH:
      var windSpeed = state.get('windSpeed');
      var windGust = state.get('windGust');

      return state.set('windGust', conversionCalulator(allUnits.MPH, windGust)).set('windSpeed', conversionCalulator(allUnits.MPH, windSpeed));

    case types.TO_KPH:
      var windSpeed = state.get('windSpeed');
      var windGust = state.get('windGust');

      return state.set('windGust', conversionCalulator(allUnits.KPH, windGust)).set('windSpeed', conversionCalulator(allUnits.KPH, windSpeed));

    case types.TO_CELSIUS:
      var temp = state.get('temp');
      var feelsLike = state.get('feelsLike');
      return state.set('temp', conversionCalulator(allUnits.CELSIUS, temp)).set('feelsLike', conversionCalulator(allUnits.CELSIUS, feelsLike));

    case types.TO_FAHREN:
      var temp = state.get('temp');
      var feelsLike = state.get('feelsLike');
      return state.set('temp', conversionCalulator(allUnits.FAH, temp)).set('feelsLike', conversionCalulator(allUnits.FAH, feelsLike));

    default:
      return state;
  }
};

export const hourly = (state = hourlyIS, action = {}) => {
  switch(action.type) {
    case types.SEARCH_SUCCESS:
      // on success parse the data and return a new state.
      return action.data.hourly ? parseHourly(state, action.data.hourly) : state;

      // on conversions, get the current state, iterate over each forecast block
      // and preform the conversions for the appropriate data fields
      case types.TO_MPH:
        var dataBlock = state.get('forecast');
        dataBlock.forEach((forecast) =>  {
          forecast.windGust = conversionCalulator(allUnits.MPH, forecast.windGust)
          forecast.windSpeed = conversionCalulator(allUnits.MPH, forecast.windSpeed)
        })
        return state.set('forecast', dataBlock);

      case types.TO_KPH:
        var dataBlock = state.get('forecast');
        dataBlock.forEach((forecast) =>  {
          forecast.windGust = conversionCalulator(allUnits.KPH, forecast.windGust)
          forecast.windSpeed = conversionCalulator(allUnits.KPH, forecast.windSpeed)
        })
        return state.set('forecast', dataBlock);

      case types.TO_CELSIUS:
        var dataBlock = state.get('forecast');
        dataBlock.forEach((forecast) => {
          forecast.temp = conversionCalulator(allUnits.CELSIUS, forecast.temp);
          forecast.feelsLike = conversionCalulator(allUnits.CELSIUS, forecast.feelsLike);
        })

        return state.set('forecast', dataBlock);

      case types.TO_FAHREN:
        var dataBlock = state.get('forecast');
        dataBlock.forEach((forecast) => {
          forecast.temp = conversionCalulator(allUnits.FAH, forecast.temp);
          forecast.feelsLike = conversionCalulator(allUnits.FAH, forecast.feelsLike);
        })

        return state.set('forecast', dataBlock);
    default:
      return state;
  }
};

/**
  The Alerts Reducer only saves ONE alert,
  ideally we should be able to go through many alerts, but for the time being
  I think one alert is okay :)
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

/*--------------------------- HELPER FUNCTIONS ---------------------------*/

const conversionCalulator = (toUnit, value) => {
  const KPH_CONVERSION = 1.60934;
  const MPH_CONVERSION = 0.621371;

  switch(toUnit) {
    case allUnits.KPH:
      return Math.ceil(value * KPH_CONVERSION);
    case allUnits.MPH:
      return Math.ceil(value * MPH_CONVERSION);
    case allUnits.FAH:
      return Math.ceil((value * 9/5) + 32);
    case allUnits.CELSIUS:
      return Math.ceil((value - 32) * 5/9);
    default:
      break;
  }
}
