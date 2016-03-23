import React from 'react';

import ServiceGlobalStatus from './ServiceGlobalStatus.jsx';
import ServiceGlobalValue from './ServiceGlobalValue.jsx';

var Service = React.createClass({

  valueFromExecutors: function(property){
    var value = "";
    var status = "OK";

    var executors = this.props.serv.executors;

    if ( !executors || executors.length == 0) {
      return {"status": "KO", "value": "No data !"};
    }

    for (var i=0; i < executors.length; i++) {
      var propValue = executors[i].metadata[property]; 
      if (propValue) {
        if (propValue !== value) {
          if (value === "") {
            value = propValue;
          }  else {
            value = value + ", " + propValue;
            status = "WARNING";
          }
        }
      } else {
        value = "None";
        status = "WARNING";
        break;
      }
    }

    return {"status": status, "value": value};
  },

  // This component doesn't hold any state - it simply transforms
  // whatever was passed as attributes into HTML that represents a Service.
  clickHandler: function(){
      // When the component is clicked, trigger the onClick handler that 
      // was passed as an attribute when it was constructed:
      this.props.onClick(this.props.serv.id);
    },

    render: function(){
      return (
        <div className="col-sm-3 col-lg-3">
          <div className="half-unit">
            <ServiceGlobalStatus executors={this.props.serv.executors} />
            <dtitle>{this.props.serv.name}</dtitle>
            <hr/>
            <ServiceGlobalValue data={this.valueFromExecutors("version")} iconType="version" />
          </div>
        </div>
        );
    }

  });

export default Service;