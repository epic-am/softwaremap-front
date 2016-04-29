import { combineReducers } from 'redux'
import { UPDATE_EVERYTHING,  OPEN_SERVICE_CARD, CLOSE_SERVICE_CARD, SET_LOADING_STATE, CHANGE_SERVICE_TAB } from './actions'

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

      var newState = [];
      var serv;
      for (var i=0; i< action.services.length; i++) {
        newState.push(action.services[i])
        newState[i].current_tab = Constants.DEFAULT_SERVICE_TAB
        newState[i].card_open = true
        for (var j=0; j < state.length; j++) {
          if (state[j].id == newState[i].id) {
            newState[i].current_tab = state[j].current_tab
            newState[i].card_open = state[j].card_open
          }
        }
      }

      return newState;
    
    case OPEN_SERVICE_CARD:
      return state.map((service) => {
        if (service.id === action.serviceId) {
          return _.assign({}, service, {card_open: true})
        } else {
          return _.assign({}, service)
        }
      })
  
    case CLOSE_SERVICE_CARD:
      return state.map((service) => {
        if (service.id === action.serviceId) {
          return _.assign({}, service, {card_open: false})
        } else {
          return _.assign({}, service)
        }
      })

    case CHANGE_SERVICE_TAB:
      return state.map((service, index) => {
        if (service.id === action.serviceId) {
          return _.assign({}, service, {current_tab: action.new_tab})
        } else {
          return _.assign({}, service)
        }
      })

    default:
      return state
  }
}

const softwareMapApp = combineReducers({
  app,
  services
})

export default softwareMapApp