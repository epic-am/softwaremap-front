var _ = require('lodash');

export function takeValueIntoAccount (metadata, actualObject) {
  var value = actualObject.value;
  var status = actualObject.status;

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

  return {"status": status, "value": value};
}