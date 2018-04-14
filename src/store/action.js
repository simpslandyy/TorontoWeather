import { config } from '../_buddyconfig.js';
import { types, methods } from '../constants';


const stringifyDarkSky = (lat, lng) => {
  // Temp bypass cors, proxy https://cors-anywhere.herokuapp.com/
  let cors =  'https://cors-anywhere.herokuapp.com/';
  return cors + config.darkSky.baseurl + config.darkSky.key + '/' + lat + ',' + lng;
}

const stringifyGoogle = (place) => {
  return config.google.baseurl + 'json?address=' + place + '&key=' + config.google.key;
}

const parseGoogle = (data) => {
  return data.results[0].geometry.location;
}

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
        dispatch({type: types.SEARCH_ERROR, msg: 'Something has gone wrong on our end! Sorry!'});
      }
    }
  }

}
