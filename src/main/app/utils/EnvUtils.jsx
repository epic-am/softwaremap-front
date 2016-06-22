var _ = require('lodash');

var Constants = require('./Constants.jsx');

/******************************************
            PRIVATE FUNCTIONS
******************************************/


/******************************************
            PUBLIC FUNCTIONS
******************************************/

export function sortEnv(e) {

  var envs = _.assign([],e);



  return envs.sort(function(a, b) {
    var valA = Constants.ENV_ORDER.hasOwnProperty(a.toUpperCase()) ? Constants.ENV_ORDER[a.toUpperCase()] : Constants.ENV_OTHER_ORDER;
    var valB = Constants.ENV_ORDER.hasOwnProperty(b.toUpperCase()) ? Constants.ENV_ORDER[b.toUpperCase()] : Constants.ENV_OTHER_ORDER;
    return valA - valB;
  });

}
