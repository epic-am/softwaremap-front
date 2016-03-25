import React from 'react';

import ServiceGlobalHealth from './ServiceGlobalHealth.jsx';
import ServiceGlobalValue from './ServiceGlobalValue.jsx';

var VersionUtils = require('./utils/VersionUtils.jsx');

var Service = React.createClass({

  metadataFromExecutors: function(compareCallback){
    var returnObject = {status: null, version: null};

    var executors = this.props.serv.executors;

    if ( !executors || executors.length == 0) {
      returnObject = {"status": "NONE", "value": "No data :("};
    } else {
      // TODO : extraire les status dans un component generic avec enum !
      for (var i=0; i < executors.length; i++) {
        returnObject = compareCallback.call(this, executors[i].metadata, returnObject);
      }

    }

    return returnObject;
  },

  versionRenderCallback: function(data) {
    return data.version ? data.version : data;
  },

  // This component doesn't hold any state - it simply transforms
  // whatever was passed as attributes into HTML that represents a Service.
  clickHandler: function() {
      // When the component is clicked, trigger the onClick handler that 
      // was passed as an attribute when it was constructed:
      this.props.onClick(this.props.serv.id);
    },

    render: function(){
      return (
        <div className="col-sm-3 col-lg-3">
          <div className="half-unit">
            <ServiceGlobalHealth executors={this.props.serv.executors} />

            <dtitle>{this.props.serv.name}</dtitle>
            <hr/>
            <ServiceGlobalValue 
              data={this.metadataFromExecutors(VersionUtils.takeValueIntoAccount)} 
              renderCallback={this.versionRenderCallback} 
              iconType="version" />
            
          </div>
        </div>
        );
    }

  });

export default Service;