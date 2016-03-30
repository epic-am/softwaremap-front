import React from 'react';

import ServiceGlobalHealth from './ServiceGlobalHealth.jsx';
import ServiceGlobalValue from './ServiceGlobalValue.jsx';
import ServiceModal from './ServiceModal.jsx';

var Modal = require('react-modal');

var VersionUtils = require('./utils/VersionUtils.jsx');
var StatusUtils = require('./utils/StatusUtils.jsx');

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0',
    background            : 'none'
  }
};


var Service = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },
 
  openModal: function() {
    this.setState({modalIsOpen: true});
  },
 
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  metadataFromExecutors: function(compareCallback){
    var returnObject;

    var executors = this.props.serv.executors;

    if ( !executors || executors.length == 0) {
      returnObject = {"status": "NONE", "value": "No data :("};
    } else {
      returnObject = compareCallback.call(this, executors);
    }

    return returnObject;
  },

  versionRenderCallback: function(data) {
    return data.version ? data.version : data;
  },

  // This component doesn't hold any state - it simply transforms
  // whatever was passed as attributes into HTML that represents a Service.
  clickHandler: function() {
    // When the component is clicked, trigger the onClick handler that 
    // was passed as an attribute when it was constructed:
    this.props.onClick(this.props.serv.id);
  },

  render: function(){

    return (
      <div className="col-sm-3 col-lg-3">
        <div className="half-unit">
          <ServiceGlobalHealth executors={this.props.serv.executors} />

          <dtitle title={this.props.serv.name}>
            {this.props.serv.name}
          </dtitle>
          <hr/>
          <ServiceGlobalValue 
            data={this.metadataFromExecutors(VersionUtils.sumUpDataCallback)} 
            renderCallback={this.versionRenderCallback} 
            iconType="version" />

          <br/>

          <button onClick={this.openModal} className="openExecutors"/> 
          <ServiceGlobalValue 
            data={this.metadataFromExecutors(StatusUtils.sumUpDataCallback)} 
            iconType="status noText" />

          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >
   
            <ServiceModal serv={this.props.serv} />
          </Modal>
        </div>
      </div>
    );
  }

});

export default Service;