var _ = require('lodash');
var Constants = require('./Constants.jsx');

export var attributesToDisplay = [
                                  {key: 'name'},
                                  {key: 'status', toStringCallback: simpleMetadataToString},
                                  {key: 'version', toStringCallback: versionMetadataToString}
                                ];

function checkNullData (executor, property) {
  return (executor == null || executor == undefined || executor.length == 0 ||
          property == null || property == undefined || property.length == 0);
}

export function simpleToString (executor, property) {
  if (checkNullData(executor, property)) {
    return '';
  }
  return executor[property] ? executor[property].toString() : Constants.NO_VALUE;
}

export function simpleMetadataToString (executor, property) {
  if (checkNullData(executor, property)){
    return '';
  }
  return executor.metadata[property] ? executor.metadata[property].toString() : Constants.NO_VALUE;
}

export function versionMetadataToString (executor, property) {
  if (checkNullData(executor, property)){
    return '';
  }
  return (executor.metadata.version && executor.metadata.version[property]) ? executor.metadata.version[property].toString() : Constants.NO_VALUE;
}
