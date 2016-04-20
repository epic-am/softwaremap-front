import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import softwareMapApp from './redux/reducer'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import AppLoader from './containers/AppLoader'

const loggerMiddleware = createLogger()
const store = createStore(
  softwareMapApp,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
)

render(
  <Provider store={store}>
    <AppLoader />
  </Provider>, 
  document.getElementById('app')
);