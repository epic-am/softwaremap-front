import fetch from 'isomorphic-fetch'
var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

/*
 * other constants
 */
export const LoadingStates = {
  LOADING: true,
  NOT_LOADING: false
}

/* 
 *     ACTION TYPES
 */
export const SET_LOADING_STATE  = 'SET_LOADING_STATE'

export const FETCH_SERVICES     = 'FETCH_SERVICES'
export const REQUEST_SERVICES   = 'REQUEST_SERVICES'
export const UPDATE_EVERYTHING  = 'UPDATE_EVERYTHING'

export const CHANGE_SERVICE_TAB = 'CHANGE_SERVICE_TAB'

export const OPEN_ALL_SERVICE_CARDS  = 'OPEN_ALL_SERVICE_CARDS'
export const CLOSE_ALL_SERVICE_CARDS = 'CLOSE_ALL_SERVICE_CARDS'
export const OPEN_ENV_SERVICE_CARDS  = 'OPEN_ENV_SERVICE_CARDS'
export const CLOSE_ENV_SERVICE_CARDS = 'CLOSE_ENV_SERVICE_CARDS'
export const OPEN_ENV_CARD           = 'OPEN_ENV_CARD'
export const CLOSE_ENV_CARD          = 'CLOSE_ENV_CARD'

export const OPEN_SERVICE_CARD   = 'OPEN_SERVICE_CARD'
export const CLOSE_SERVICE_CARD = 'CLOSE_SERVICE_CARD'

/* 
 *     ACTION CREATORS
 */
function initialize_services(services) {
  return { type: UPDATE_EVERYTHING, services }
}

export function setLoadingState(loadingState) {
  return { type: SET_LOADING_STATE, loadingState }
}

export function changeServiceTab(serviceId, new_tab) {
  return { type: CHANGE_SERVICE_TAB, serviceId, new_tab }
}

export function openAllServiceCards() {
  return { type: OPEN_ALL_SERVICE_CARDS }
}

export function closeAllServiceCards() {
  return { type: CLOSE_ALL_SERVICE_CARDS }
}

export function openEnvCard(env) {
  return { type: OPEN_ENV_CARD, env }
}

export function closeEnvCard(env) {
  return { type: CLOSE_ENV_CARD, env }
}

export function openEnvServiceCards(env) {
  if (env === null || env === undefined || env.length == 0) {
    return openAllServiceCards();
  }
  return { type: OPEN_ENV_SERVICE_CARDS, env }
}

export function closeEnvServiceCards(env) {
  if (env === null || env === undefined || env.length == 0) {
    return closeAllServiceCards();
  }
  return { type: CLOSE_ENV_SERVICE_CARDS, env }
}

export function openServiceCard(serviceId) {
  return { type: OPEN_SERVICE_CARD, serviceId }
}

export function closeServiceCard(serviceId) {
  return { type: CLOSE_SERVICE_CARD, serviceId }
}

function requestServices() {
  return { type: SET_LOADING_STATE, true }
}

export function fetchServices() {
  return dispatch => {
    dispatch(requestServices())
    return fetch(`http://127.0.0.1:4000/api/services`)
      .then(response => response.text())
      .then(json => {

        /*if (response.status === 200 || response.status === 0) {
            console.log("OK!");
        } else {
            console.log("NOK !!! :(");
        }*/

        var deserializer = new JSONAPIDeserializer()

        deserializer.deserialize(JSON.parse(json), function (err, data) 
        { dispatch(initialize_services(data)) }
        )
      })
  }
}
