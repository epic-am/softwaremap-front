import React from 'react';
import ServiceList from './ServiceList.jsx';

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

var CategoryList = React.createClass({
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


  render: function() {

    var services = this.state.services;

    var categories = <h1>Error while loading services.</h1>;

    if (!services.length) {
      services = <h1>Loading services...</h1>;
    } else {

      var categoryMap=[];

      services.forEach(function(service){

        var type = service.type;
        if (!type) {
          type = "Other";
        }

        if(categoryMap.some(elem => elem.type === type)) {
          var category = categoryMap.find(elem => elem.type === type);
          if(category) {
            category.services.push(service);
          }
        } else {
          var uid = type + Math.random().toString();
          categoryMap.push({type: type, services: [service], id: uid});
        }     
      });

      categories = categoryMap.map(function(cat){
        return (
          <div className="container">
            <h1>{cat.type}</h1>
            <ServiceList services={cat.services} key={cat.id} />
          </div>
        );
      });
    }

    return (
      <div>
        {categories}
      </div>
    );
  }
});

export default CategoryList;