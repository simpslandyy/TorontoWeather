export const SelectIcon = (props) => {
  switch(props.icon) {
    case 'clear-day':
      return 'wi wi-day-sunny';
    case 'clear-night':
      return 'wi wi-night-clear';
    case 'rain':
      return 'wi wi-showers';
    case 'snow':
      return 'wi wi-snow';
    case 'sleet':
      return 'wi wi-sleet';
    case 'wind':
      return 'wi wi-strong-wind';
    case 'fog':
      return 'wi wi-fog';
    case 'cloudy':
      return 'wi wi-cloud';
    case 'partly-cloudy-day':
      return 'wi wi-day-cloudy'
    case 'partly-cloudy-night':
      return 'wi wi-night-partly-cloudy'
    case 'hail':
      return 'wi wi-hail';
    case 'thunderstorm':
      return 'wi wi-thunderstorm';
    case 'tornado':
      return 'wi wi-tornado';
    default:
      return ""
  }
}
