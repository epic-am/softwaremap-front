import React from 'react';

var Constants = require('../utils/Constants.jsx');

var ServiceDetails = React.createClass({
  getInitialState: function(){       
    return {};
  },

  render: function() {

    var service = this.props.serv;
    var detailsToDisplay = Constants.SERVICE_DETAILS_ATTRIBUTES;

    if (service == null || service === undefined || detailsToDisplay.length == 0) {
      return (<h3>No additional data for this service.</h3>);
    }

    var serviceDetailsContent = <td>Something happened, this should not be seen</td>;

    serviceDetailsContent = detailsToDisplay.map(function(data){
      var value = Constants.NO_VALUE
      var objKey = service.id + "-details-" + data
      
      if (service.hasOwnProperty(data)) {
        value = service[data]
      }      

      return (
        <tr key={objKey}>
          <td className="text-left">{data}</td>
          <td className="text-left">{value}</td>
        </tr>
        )
    });

    var tableKey = "servicedetails-" + service.id;
    return (
      <table className="table" key={tableKey}>
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>  
          </tr>
        </thead>
        <tbody>
          {serviceDetailsContent}
        </tbody>
      </table>
    );
  }
});

export default ServiceDetails;