import React from 'react';
import Service from './Service.jsx';

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

var ServiceList = React.createClass({
  getInitialState: function(){       
    return { services: [] };
  },

  loadServicesFromServer: function(){
    // When the component loads, send a jQuery AJAX request
    var self = this;

    // API endpoint for SoftwareMap's services
    var url = this.props.baseUrl + 'services';

    $.getJSON(url, function(result){

      if(!result || !result.data || !result.data.length){
        return {error: "Error while fetching services"};
      }

      new JSONAPIDeserializer().deserialize(result, function (err, jsonData) {
        var services=jsonData;
        self.setState({ services: services });
      });
    })
  },

  componentDidMount: function(){
    this.loadServicesFromServer();
    setInterval(this.loadServicesFromServer, this.props.updateInterval);
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

    var self = this;

    var services = this.state.services.map(function(serv){
      return <Service serv={serv} key={serv.id} />
    });

    if(!services.length){
      services = <h1>Loading services..</h1>;
    }

    return (

      <div className="container">
        <div className="row">
          {services}
        </div>
      </div>

      );
  }
});

export default ServiceList;