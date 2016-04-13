import React from 'react';

import ServiceGlobalValue from './ServiceGlobalValue.jsx';

var StatusUtils = require('./utils/StatusUtils.jsx');
var VersionUtils = require('./utils/VersionUtils.jsx');
var HealthUtils = require('./utils/HealthUtils.jsx');
var Constants = require('./utils/Constants.jsx');

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

  render: function(){

    var executors = this.props.serv.executors;

    var servHealth = HealthUtils.getServiceHealthFromExecutors(executors);
    var healthHeaderClass="header header-" + Constants.statusClassMap[servHealth];

    return (
      <div className="col-md-6">
        <div className="card card-nav-tabs">
          <div className={healthHeaderClass}>
            <h3>{this.props.serv.name}</h3>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <ul className="nav nav-tabs" data-tabs="tabs">
                  <li className="active">
                    <a href="#health" data-toggle="tab">
                      <i className="fa fa-2x fa-heartbeat material-icons" aria-hidden="true"></i>
                      &nbsp; Health
                    </a>
                  </li>
                  <li>
                    <a href="#executors" data-toggle="tab">
                      <i className="material-icons">dns</i>
                      &nbsp; Executors
                    </a>
                  </li>
                  <li>
                    <a href="#details" data-toggle="tab">
                      <i className="fa fa-2x fa-info material-icons" aria-hidden="true"></i>
                      &nbsp; Details
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="content">
            <ServiceGlobalValue data={VersionUtils.extractGlobalVersionFromExecutors(executors)} renderCallback={VersionUtils.versionStringFromObject} />
            <ServiceGlobalValue data={StatusUtils.extractGlobalStatusFromExecutors(executors)} />
          </div>
        </div>
      </div>
    );
  }

});

export default Service;