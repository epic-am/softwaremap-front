import React from 'react';

var _ = require('lodash');

var Constants = require('../utils/Constants.jsx');
var StatusUtils = require('../utils/StatusUtils.jsx');
var ExecutorUtils = require('../utils/ExecutorUtils.jsx');
var VersionUtils = require('../utils/VersionUtils.jsx');

var attributesToDisplay = [
                            {key: 'env'},
                            {key: 'status', toStringCallback: ExecutorUtils.simpleMetadataToString},
                            {key: 'version', toStringCallback: ExecutorUtils.versionMetadataToString}
                          ];

var ServiceOtherEnv = React.createClass({
  getInitialState: function(){       
    return {};
  },

  render: function() {

    var services = this.props.otherEnv;
    var otherEnvList = <h4>No other environment declared for this service</h4>; 

    if (services !== null && services !== undefined && services.length > 0) {
      otherEnvList = services.map(function(serv){
        var env = serv.env;
        var version = VersionUtils.extractGlobalVersionFromExecutors(serv.executors).value;
        var status = StatusUtils.extractGlobalStatusFromExecutors(serv.executors).value;

        return (
          <tr>
            <td>{env}</td>
            <td>{version}</td>
            <td>{status}</td>
          </tr>
        ); 
      });

    
    } else {
      return otherEnvList
    }


    var attributesNames = attributesToDisplay.map(function(attr){
      var key="otherEnv-"+attr.key;
      return <th className="text-center" key={key}>{attr.key}</th>
    });

    var tableKey = "servicesOtherEnv-"+this.props.servId;

    return (
      <table className="table" key={tableKey}>
        <thead>
          <tr>
            <td>Env</td>
            <td>version</td>
            <td>status</td>
          </tr>
        </thead>
        <tbody>
          {otherEnvList}
        </tbody>
      </table>
    );
  }
});

export default ServiceOtherEnv;