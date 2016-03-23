import React from 'react';

var ServiceGlobalValue = React.createClass({

  render: function() {
  var finalClass = "serviceGlobalValue " + this.props.iconType + " " + this.props.data.status;
    return (
        <span className={finalClass}>
          <span className="icon" />
          <span className="value">{this.props.data.value}</span>
        </span>
    );
  }

});

export default ServiceGlobalValue;