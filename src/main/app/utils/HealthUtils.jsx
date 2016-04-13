var _ = require('lodash');

var StatusUtils = require('./StatusUtils.jsx');
var Constants = require('./Constants.jsx');

/******************************************
                 FUNCTIONS
******************************************/

export function getServiceHealthFromExecutors (executors) {

  if ( !executors || executors.length == 0) { 
    return Constants.NO_STATUS;
  }

  return StatusUtils.extractGlobalStatusFromExecutors(executors).value;
}