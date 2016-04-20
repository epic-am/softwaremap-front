import { combineReducers } from 'redux'
import { INITIALIZE_SERVICES, SET_LOADING_STATE, UPDATE_EXECUTOR } from './actions'

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

    case INITIALIZE_SERVICES:
      //Sould already be an array
      return action.services 

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


    default:
      return state
  }
}

const softwareMapApp = combineReducers({
  app,
  services
})

export default softwareMapApp