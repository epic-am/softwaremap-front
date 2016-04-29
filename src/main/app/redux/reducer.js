import { combineReducers } from 'redux'
import { UPDATE_EVERYTHING, SET_LOADING_STATE, UPDATE_EXECUTOR, CHANGE_SERVICE_TAB } from './actions'

var Constants = require('../utils/Constants.jsx');

const initialState = {
  app: {
    loading : true,
    error : null
  },
  services : {}
}


function app(state = initialState.app, action) {
  switch (action.type) {
    case SET_LOADING_STATE:
      return _.assign({}, state, {
        loading: action.loadingState
      })

    default:
      return state
  }
}

function services(state = [], action) {
  switch (action.type) {

    case UPDATE_EVERYTHING:

      if (action.services == null || action.services == undefined || action.services.length == 0) {
        return this.initialState.services
      }

      if (state.length == 0) {
        return action.services
      }

      var newState = [];
      var serv;
      for (var i=0; i< action.services.length; i++) {
        newState.push(action.services[i])
        newState[i].current_tab = Constants.DEFAULT_SERVICE_TAB
        for (var j=0; j < state.length; j++) {
          if (state[j].id == newState[i].id) {
            newState[i].current_tab = state[j].current_tab
          }
        }
      }

      return newState;
    
    case UPDATE_EXECUTOR:
      return state.map((service, index) => {
        if (index === action.serviceIndex) {
          return _.assign({}, service, {
            executors: service.executors.map((executor, ind) => {
              if (ind === action.executorIndex) {
                return _.assign({}, executor, {
                  metadata: action.metadata
                })
              }
              return executor
            })
          })
        }
        return service
      })

    case CHANGE_SERVICE_TAB:
      var newState = state.map((service, index) => {
        if (service.id === action.serviceIndex) {
          return _.assign({}, service, {current_tab: action.new_tab})
        } else {
          return _.assign({}, service)
        }
      })

      return newState

    default:
      return state
  }
}

const softwareMapApp = combineReducers({
  app,
  services
})

export default softwareMapApp