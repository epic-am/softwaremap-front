var _ = require('lodash');

var Constants = require('./Constants.jsx');

export function extractGlobalVersionFromExecutors (executors) {

  if ( !executors || executors.length == 0) {
    return {"status": Constants.NO_STATUS, "value": Constants.NO_VALUE};
  } else {

    var value = null;
    var status = null;
    var metadata;

    for (var i=0; i < executors.length; i++) {
      metadata = executors[i].metadata;
      if (metadata) {
        var propValue = metadata['version'];

        if (propValue) {
          if (value === null || value === undefined) {
            value = propValue;
            status = Constants.OK_STATUS;
          } else if (!_.isEqual(propValue, value)) {
            value = Constants.MULTIPLE_VALUE;
            status = Constants.WARNING_STATUS;
          }

        } else {
          if (value === null || value === undefined) {
            value = Constants.NO_VALUE;
            status = Constants.NO_STATUS;
          } else {
            value = Constants.KO_VALUE;
            status = Constants.KO_STATUS;
          }
        }

      } else {
        value = Constants.NO_VALUE;
        status = Constants.KO_STATUS;
      }
    }

    return {"status": status, "value": value};
  }
}

export function versionStringFromObject (versionObject) {
  if (versionObject == null || versionObject == undefined) {
    return Constants.NO_VALUE;
  }

  return versionObject.version ? versionObject.version.toString() : versionObject.toString();
}

export function versionFullStringFromObject (versionObject) {
  if (versionObject == null || versionObject == undefined) {
    return Constants.NO_VALUE;
  }

  var finalString = "";

  for(var propt in versionObject){
      finalString += propt +": " + versionObject[propt] + "\n";
  }

  return finalString;
}