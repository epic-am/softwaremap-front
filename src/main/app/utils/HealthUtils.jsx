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

  var status = StatusUtils.extractGlobalStatusFromExecutors(executors).value;

  if (status == Constants.NO_STATUS) {
    return Constants.WARNING_STATUS;
  }
  if (status != Constants.OK_STATUS) {
    return status;
  }

  var status = VersionUtils.extractGlobalVersionFromExecutors(executors).status;

  if (status == Constants.NO_STATUS) {
    return Constants.WARNING_STATUS;
  }
  if (status != Constants.OK_STATUS) {
    return status;
  }

  return Constants.OK_STATUS; 
}