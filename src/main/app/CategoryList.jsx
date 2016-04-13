import React from 'react';
import ServiceList from './ServiceList.jsx';

var JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;

var CategoryList = React.createClass({
  getInitialState: function(){       
    return { categoryMap: [] };
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
        //self.setState({ services: services });

        var categoryMap=[];
        var idTemp=1;

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
            categoryMap.push({type: type, services: [service], id: idTemp});
            idTemp = idTemp + 1;
          }     
        });

        self.setState({ categoryMap: categoryMap});

      });


    })
  },

  componentDidMount: function(){
    this.loadServicesFromServer();
    setInterval(this.loadServicesFromServer, this.props.updateInterval);
  },


  render: function() {

    var categories = <h1>Error while loading services.</h1>;
    var categoryMap = this.state.categoryMap;


    if (categoryMap !== null && categoryMap !== undefined) {
      categories = categoryMap.map(function(cat){
        return (
          <div className="section section-tabs" key={cat.id}>
            <div className="container tim-container text-center">
              <div className="title text-center">
                <h2>{cat.type}</h2>
              </div>

              <ServiceList services={cat.services} key={cat.type} />
            </div>
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