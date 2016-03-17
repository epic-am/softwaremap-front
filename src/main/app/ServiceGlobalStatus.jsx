import React from 'react';

var ServiceGlobalStatus = React.createClass({

  render: function(){
    var res = "NONE";
    var tempStatus = "";

    var executors = this.props.executors;

    for (var i=0; i < executors.length; i++) {

      tempStatus = executors[i].metadata.status.toUpperCase();

      if (tempStatus === "DOWN" || tempStatus === "FAILURE") {
        res = "KO";
        break;
      } else if (tempStatus === "UNSTABLE" || tempStatus === "OUT") {
        res = "WARNING";
      } else if ((tempStatus === "UP" || tempStatus === "SUCCESS") && res !== "WARNING") {
        res = "OK";
      }
    }

    return (
        <i className={res}></i>
    );
  }

});

export default ServiceGlobalStatus;