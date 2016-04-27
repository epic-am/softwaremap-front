import React from 'react';

var Constants = require('../utils/Constants.jsx');

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

    if ( status == Constants.NO_STATUS && value == Constants.NO_VALUE ) {
      var ulStyle = {
        display: 'none'
      };
      return (<ul className={finalClassName} style={ulStyle}/>);
    }


    var iconType = this.props.iconType ? this.props.iconType : Constants.DEFAULT_PILL_ICON_TYPE;
    var iconName = this.props.iconName ? this.props.iconName : Constants.DEFAULT_PILL_ICON_NAME;
    
    var icon = (<i class="fa fa-times" aria-hidden="true"></i>);

    if (iconType == Constants.FONT_AWESOME) {
      var iconClass = "fa fa-2x material-icons " + iconName;
      icon = <i className={iconClass} aria-hidden="true"></i>
    } else if (iconType == Constants.MATERIAL_KIT) {
      icon = <i className="material-icons">{iconName}</i>
    }

    return (
      <ul className={finalClassName} role="tablist">
        <li className="active">

        
          <a href="#schedule" role="tab" data-toggle="tab" aria-expanded="true">
            {icon}
            {value}
          </a>
        </li>
      </ul>
    );
  }

});

export default ServiceGlobalValue;