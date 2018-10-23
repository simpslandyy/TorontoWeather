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
  // console.log(cors + config.darkSky.baseurl + config.darkSky.key + '/' + lat + ',' + lng)
  return cors + config.darkSky.baseurl + config.darkSky.key + '/' + lat + ',' + lng;
}

// Need to change this API for this to work
const stringifyGoogle = (place) => {
  return config.google.baseurl + 'json?address=' + place;
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
    dispatch({type: types.SEARCHING, data: place});
    // Request the lat/lng of the place provided.
    var gresponse = await fetch(stringifyGoogle(place), methods.GET);
    var gdata = await gresponse.json();

    // If the status is not okay, then just console.log an error
    // This can be changed to dispatch an action, but for the scope of this
    // assignment I will leave it out
    if (gdata.status != 'OK') {
      console.log("Error!");
      console.log(gdata);
    } else {

      // Parse the google data for the lat/lng
      let location = parseGoogle(gdata);
      let lat = location.lat;
      let lng = location.lng;

      // Request data from DarkSky API
      var response = await fetch(stringifyDarkSky(lat, lng), methods.GET);
      var data = await response.json();

      // Dispatch reducers for succesful fetch
      if (response.ok) {
        dispatch({type: types.SEARCH_SUCCESS, data: data})
      } else {
        console.log("ERROR");
        // dispatch({type: types.SEARCH_ERROR, msg: 'Something has gone wrong on our end! Sorry!'});
      }
    }
  };
};

/**
  Action to toggle between Fahrenheit and Celsius
**/
export const toggleTemp = (fromUnit, toUnit) => {
  return dispatch => {

    // If the unit is the same as before, don't do anything
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

    // If the unit is the same as before, don't do anything
    if (fromUnit != toUnit) {
      if (toUnit == allUnits.KPH) {
        dispatch({type: types.TO_KPH})
      } else {
        dispatch({type: types.TO_MPH})
      }
    }
  };
};
