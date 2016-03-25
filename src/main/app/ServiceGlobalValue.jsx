import React from 'react';

var ServiceGlobalValue = React.createClass({

  render: function() {
  var finalClass = "serviceGlobalValue " + this.props.iconType + " " + this.props.data.status;

  var value;
  if (this.props.renderCallback) {
    value = this.props.renderCallback.call(this, this.props.data.value);
  } else {
    value = this.props.data.value;
  }

    return (
        <span className={finalClass}>
          <span className="icon" />
          <span className="value">{value}</span>
        </span>
    );
  }

});

export default ServiceGlobalValue;