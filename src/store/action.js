import { config } from '../_buddyconfig.js';
import { types, methods, allUnits } from '../constants';

/**
  Helper Functions:
    stingify* : builds the URL for the corresponding service
    parseGoogle: parses the data to extra the location (lat/lng object)
**/
const stringifyDarkSky = (lat, lng) => {
  // Temp bypass cors, proxy https://cors-anywhere.herokuapp.com/
  let cors =  'https://cors-anywhere.herokuapp.com/';
  console.log(cors + config.darkSky.baseurl + config.darkSky.key + '/' + lat + ',' + lng)
  return cors + config.darkSky.baseurl + config.darkSky.key + '/' + lat + ',' + lng;
}

const stringifyGoogle = (place) => {
  return config.google.baseurl + 'json?address=' + place + '&key=' + config.google.key;
}

const parseGoogle = (data) => {
  return data.results[0].geometry.location;
}


/**
  Fetch Weather Forecast
    Request location from Google to get lat/lng,
    then request the forecast from DarkSky
**/
export const fetchWeather = (place) => {
  return async dispatch => {
    console.log('Requesting lat lng from Google');
    var gresponse = await fetch(stringifyGoogle(place), methods.GET);
    var gdata = await gresponse.json();

    if (gdata.status != 'OK') {

      dispatch({type: types.SEARCH_ERROR, msg: 'Please provide a valid city'});
    } else {

      console.log('Requesting weather from DarkSky');
      let location = parseGoogle(gdata);
      let lat = location.lat;
      let lng = location.lng;

      var response = await fetch(stringifyDarkSky(lat, lng), methods.GET);
      var data = await response.json();
      if (response.ok) {
        dispatch({type: types.SEARCH_SUCCESS, data: data})
      } else {
        console.log("ERROR")
        dispatch({type: types.SEARCH_ERROR, msg: 'Something has gone wrong on our end! Sorry!'});
      }
    }
  };
};

/**
  Action to toggle between Fahrenheit and Celsius
**/
export const toggleTemp = (fromUnit, toUnit) => {
  return dispatch => {
    console.log({toUnit: toUnit, fromUnit: fromUnit})
    if (fromUnit != toUnit) {
      if (toUnit == allUnits.CELSIUS) {
        dispatch({type: types.TO_CELSIUS})
      } else {
        dispatch({type: types.TO_FAHREN})
      }
    }
  };
};

/**
  Action to toggle between MPH and KPH
**/
export const toggleSpeed = (fromUnit, toUnit) => {
  return dispatch => {
    console.log({toUnit: toUnit, fromUnit: fromUnit})
    if (fromUnit != toUnit) {
      if (toUnit == allUnits.KPH) {
        dispatch({type: types.TO_KPH})
      } else {
        dispatch({type: types.TO_MPH})
      }
    }
  };
};
