import React from 'react';

var Constants = require('./utils/Constants.jsx');

var ServiceGlobalValue = React.createClass({

  render: function() {

    var value;
    if (this.props.renderCallback) {
      value = this.props.renderCallback.call(this, this.props.data.value);
    } else if (this.props.data && this.props.data.value) {
      value = this.props.data.value;
    } else {
      value = Constants.NO_VALUE;
    }

    var status = this.props.data.status ? this.props.data.status : Constants.KO_STATUS;
    var finalClassName = "nav nav-pills nav-pills-" + Constants.statusClassMap[status];

    return (
      <ul className={finalClassName} role="tablist">
        <li className="active">
          <a href="#schedule" role="tab" data-toggle="tab" aria-expanded="true">
          <i className="material-icons">schedule</i>
            {value}
          </a>
        </li>
      </ul>
    );
  }

});

export default ServiceGlobalValue;