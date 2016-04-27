import React from 'react';
import ServiceContainer from '../containers/ServiceContainer.js';

var ServiceList = React.createClass({
  getInitialState: function(){       
    return {};
  },

  pictureClick: function(id){

    // id holds the ID of the picture that was clicked.
    // Find it in the pictures array, and add it to the favorites
    var favorites = this.state.favorites,
    services = this.state.services;

    // Update the state and trigger a render
    this.setState({services: services});

  },

  render: function() {

    var services = this.props.services;
    var serviceList = <div className="title text-center"></div>;

    if (services !== null && services !== undefined && services.length > 0) {
      serviceList = services.map(function(serv){
        return <ServiceContainer serv={serv} key={serv.id} />
      });
    } else if (this.props.is_loding == true) {
        serviceList = <div className="title text-center"><h1>Loading ...</h1></div>;
      } else {
        serviceList = <div className="title text-center"><h1>No service :(</h1></div>;
    }

    return (
      <div className="row">
        {serviceList}
      </div>
    );
  }
});

export default ServiceList;