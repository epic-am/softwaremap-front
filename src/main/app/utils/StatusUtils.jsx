var _ = require('lodash');

var OkArray = ["UP", "SUCCESS"];
var KoArray = ["DOWN", "FAILURE"];
var WarningArray = ["OUT", "UNSTABLE"];

export var OK_STATUS = "OK";
export var KO_STATUS = "KO";
export var WARNING_STATUS = "WARNING";
export var NO_STATUS = "NONE";

export function isStatusOk (status) {
  return _.indexOf(OkArray, status) != -1;
}

export function isStatusKo (status) {
  return _.indexOf(KoArray, status) != -1;
}

export function isStatusWarning (status) {
  return _.indexOf(WarningArray, status) != -1;
}

export function globalStatus(executors) {
  var res = NO_STATUS;
  var tempStatus = "";

  if ( !executors || executors.length == 0) { 
    return NO_STATUS;
  }

  for (var i=0; i < executors.length; i++) {

    tempStatus = executors[i].metadata["status"];

    if (!tempStatus) {
      res = KO_STATUS;
      break;
    }
    
    tempStatus = tempStatus.toUpperCase();

    if (isStatusKo(tempStatus)) {
      res = KO_STATUS;
      break;
    } else if (isStatusWarning(tempStatus)) {
      res = WARNING_STATUS;
    } else if (isStatusOk(tempStatus) && res !== WARNING_STATUS) {
      res = OK_STATUS;
    }
  }

  return res;
}

export function sumUpDataCallback (executors) {
  
  var status = globalStatus(executors);
  var value = "";

  switch(status) {
    case OK_STATUS:
        value = "All up !";
        break;
    case WARNING_STATUS:
        value = "Warning";
        break;
    case NO_STATUS: 
        value = "No data to check";
        break;
    default:
        value = "Something's wrong !";
  }

  return {"status": status, "value": value};
}