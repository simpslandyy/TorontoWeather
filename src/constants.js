export const types = {
  SEARCH_ERROR: 'SEARCH_ERROR',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SET_REDIRECT: 'SET_REDIRECT',
  TO_MPH: 'TO_MPH',
  TO_KPH: 'TO_kPH',
  TO_CELSIUS: 'TO_CELSIUS',
  TO_FAHREN: 'TO_FAHREN'

}


export const methods = {
  GET : {
    headers: {
      'Accept': 'application/json',
    },
    method: 'GET'
  }
}


export const allUnits = {
  KPH: 'kph',
  MPH: 'mph',
  CELSIUS: 'C',
  FAH: 'F'
}
