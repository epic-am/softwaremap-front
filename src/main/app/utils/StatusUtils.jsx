var _ = require('lodash');

var Constants = require('./Constants.jsx');

var OkArray = ["UP", "SUCCESS"];
var KoArray = ["DOWN", "FAILURE"];
var WarningArray = ["OUT", "UNSTABLE"];

/******************************************
            PRIVATE FUNCTIONS
******************************************/

function isStatusOk (status) {
  return _.indexOf(OkArray, status) != -1;
}

function isStatusKo (status) {
  return _.indexOf(KoArray, status) != -1;
}

function isStatusWarning (status) {
  return _.indexOf(WarningArray, status) != -1;
}

/******************************************
            PUBLIC FUNCTIONS
******************************************/

export function extractGlobalStatusFromExecutors(executors) {
  var res = Constants.NO_STATUS;
  var tempStatus = "";

  if ( !executors || executors.length == 0) { 
    return {"status": Constants.NO_STATUS, "value": Constants.NO_VALUE};
  }

  for (var i=0; i < executors.length; i++) {

    tempStatus = executors[i].metadata["status"];

    if (!tempStatus) {
      res = Constants.KO_STATUS;
      break;
    }
    
    tempStatus = tempStatus.toUpperCase();

    if (isStatusKo(tempStatus)) {
      res = Constants.KO_STATUS;
      break;
    } else if (isStatusWarning(tempStatus)) {
      res = Constants.WARNING_STATUS;
    } else if (isStatusOk(tempStatus) && res !== Constants.WARNING_STATUS) {
      res = Constants.OK_STATUS;
    }
  }

  return {"status": res, "value": res};
}
