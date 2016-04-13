var _ = require('lodash');

export var modalAttributes = [
                              {key: 'name'},
                              {key: 'status'},
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
  return executor[property].toString();
}

export function simpleMetadataToString (executor, property) {
  if (checkNullData(executor, property)){
    return '';
  }
  return executor.metadata[property].toString();
}

export function versionMetadataToString (executor, property) {
  if (checkNullData(executor, property)){
    return '';
  }
  return executor.metadata.version[property].toString();
}
