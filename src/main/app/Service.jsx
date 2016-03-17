import React from 'react';

import ServiceGlobalStatus from './ServiceGlobalStatus.jsx';

var Service = React.createClass({

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
          </div>
        </div>
        );
    }

  });

export default Service;