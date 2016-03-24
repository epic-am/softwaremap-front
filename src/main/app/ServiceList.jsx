import React from 'react';
import Service from './Service.jsx';

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
    var serviceList = <h1>No service :(</h1>;

    if (services !== null && services.length > 0) {
      serviceList = services.map(function(serv){
        return <Service serv={serv} key={serv.id} />
      });
    }

    return (
      <div className="row">
        {serviceList}
      </div>
    );
  }
});

export default ServiceList;