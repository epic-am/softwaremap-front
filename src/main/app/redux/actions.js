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

export const ADD_SERVICE        = 'ADD_SERVICE'
export const UPDATE_SERVICE     = 'UPDATE_SERVICE'

export const ADD_EXECUTOR       = 'ADD_EXECUTOR'
export const UPDATE_EXECUTOR    = 'UPDATE_EXECUTOR'

export const CHANGE_SERVICE_TAB = 'CHANGE_SERVICE_TAB'

/* 
 *     ACTION CREATORS
 */
function initialize_services(services) {
  return { type: UPDATE_EVERYTHING, services }
}

export function addService(service) {
  return { type: ADD_SERVICE, service }
}

export function updateService(metadata) {
  return { type: UPDATE_SERVICE, metadata }
}

export function addExecutor(executor) {
  return { type: ADD_EXECUTOR, executor }
}

export function updateExecutor(serviceIndex, executorIndex, metadata) {
  return { type: UPDATE_EXECUTOR, serviceIndex, executorIndex, metadata }
}

export function setLoadingState(loadingState) {
  return { type: SET_LOADING_STATE, loadingState }
}

export function changeServiceTab(serviceIndex, new_tab) {
  return { type: CHANGE_SERVICE_TAB, serviceIndex, new_tab }
}

function requestServices() {
  return { type: SET_LOADING_STATE, true }
}

export function fetchServices() {
  return dispatch => {
    dispatch(requestServices())
    return fetch(`http://127.0.0.1:3000/api/services`)
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
