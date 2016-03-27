import React from 'react';
var StatusUtils = require('./utils/StatusUtils.jsx');

var ServiceGlobalHealth = React.createClass({

  render: function(){
    var res = StatusUtils.globalStatus(this.props.executors);

    return (
        <i className={res}></i>
    );
  }

});

export default ServiceGlobalHealth;