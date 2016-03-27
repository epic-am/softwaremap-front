var _ = require('lodash');

export function sumUpDataCallback (executors) {

  var value = null;
  var status = null;
  var metadata;

// TODO : extraire les status dans un component generic avec enum !
  for (var i=0; i < executors.length; i++) {
    metadata = executors[i].metadata;
    if (metadata) {
      var propValue = metadata['version'];

      if (propValue) {
        if (value === null || value === undefined) {
          value = propValue;
          status = "OK";
        } else if (!_.isEqual(propValue, value)) {
          value = "Multiple values";
          status = "WARNING";
        }

      } else {
        if (value === null || value === undefined) {
          value = "None";
          status = "NONE";
        } else {
          value = "Error !";
          status = "KO";
        }
      }

    } else {
      value = "Error !";
      status = "KO";
    }
  }

  return {"status": status, "value": value};
}