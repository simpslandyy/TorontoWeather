export const types = {
  SEARCH_ERROR: 'SEARCH_ERROR',
  SEARCH_SUCCESS: 'SEARCH_SUCCESS',
  SET_REDIRECT: 'SET_REDIRECT'

}


export const methods = {
  GET : {
    headers: {
      'Accept': 'application/json',
    },
    method: 'GET'
  }
}
