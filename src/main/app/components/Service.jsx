import React, { PropTypes }  from 'react';
import ServiceGlobalValue from './ServiceGlobalValue.jsx';
import ServiceDetails from './ServiceDetails.jsx';
import ServiceOtherEnv from './ServiceOtherEnv.jsx'

import ExecutorList from './ExecutorList.jsx';

var StatusUtils = require('../utils/StatusUtils.jsx');
var VersionUtils = require('../utils/VersionUtils.jsx');
var HealthUtils = require('../utils/HealthUtils.jsx');
var Constants = require('../utils/Constants.jsx');

var Service = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  render: function(){

    var executors = this.props.serv.executors;

    var servHealth = HealthUtils.getServiceHealthFromExecutors(executors);
    var healthHeaderClass="header header-" + Constants.statusClassMap[servHealth];


    var cardContent = <div>This should not be seen</div>
    var cardContainerClass = "card card-nav-tabs"
    if (this.props.serv.card_open) {
      switch(this.props.serv.current_tab) {
        case Constants.DETAILS_SERVICE_TAB:
          cardContent = (
            <ServiceDetails serv={this.props.serv} />
            )
        break

        case Constants.EXECUTORS_SERVICE_TAB:
          cardContent = (
            <div className="content executor-list"><ExecutorList servId={this.props.serv.id} executors={this.props.serv.executors} /></div>
            )
        break

        case Constants.OTHERENV_SERVICE_TAB:
          cardContent = (
            <div className="content executor-list"><ServiceOtherEnv servId={this.props.serv.id} serv={this.props.serv} otherEnv={this.props.otherEnv} /></div>
            )
        break

        case Constants.HEALTH_SERVICE_TAB:
        default:
          cardContent = (
            <div className="content">
              <ServiceGlobalValue data={VersionUtils.extractGlobalVersionFromExecutors(executors)} 
                                  renderCallback={VersionUtils.versionStringFromObject} 
                                  tooltipRenderCallback={VersionUtils.versionFullStringFromObject}
                                  iconType={Constants.FONT_AWESOME} 
                                  iconName="fa-sort-numeric-asc" />
              <ServiceGlobalValue data={StatusUtils.extractGlobalStatusFromExecutors(executors)} 
                                  iconType={Constants.FONT_AWESOME} 
                                  iconName="fa-power-off" />
            </div>
            )
        break
      }
    } else {
      var contentDisplayNone = {display: "none"};
      cardContent = <div className="content" style={contentDisplayNone} />
      cardContainerClass = cardContainerClass + " closedCard"
    }

    var openCloseCardButton;
    if (this.props.serv.card_open) {
      openCloseCardButton = (<i className="serviceCardMaxMin material-icons md-48" onClick={e => this.props.closeCard()}>keyboard_arrow_up</i>)
    } else {
      openCloseCardButton = (<i className="serviceCardMaxMin material-icons md-48" onClick={e => this.props.openCard()}>keyboard_arrow_down</i>)
    }

    // In case any "ServiceGlobalValue" has a tooltip setting
    $('[data-toggle="tooltip"]').tooltip();

    return (
      <div className="col-md-6">
        <div className={cardContainerClass}>

          <div className={healthHeaderClass}>
            {openCloseCardButton}
            <h3>{this.props.serv.name}</h3>
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <ul className="nav nav-tabs" data-tabs="tabs">
                  <li className="active">
                    <a href="#health" data-toggle="tab" onClick={e => this.props.onTabChange(Constants.HEALTH_SERVICE_TAB)}>
                      <i className="fa fa-2x fa-heartbeat material-icons" aria-hidden="true"></i>
                      &nbsp; Health
                    </a>
                  </li>
                  <li>
                    <a href="#executors" data-toggle="tab" onClick={e => this.props.onTabChange(Constants.EXECUTORS_SERVICE_TAB)}>
                      <i className="material-icons">dns</i>
                      &nbsp; Executors
                    </a>
                  </li>
                  <li>
                    <a href="#details" data-toggle="tab" onClick={e => this.props.onTabChange(Constants.DETAILS_SERVICE_TAB)}>
                      <i className="fa fa-2x fa-info material-icons" aria-hidden="true"></i>
                      &nbsp; Details
                    </a>
                  </li>
                   <li>
                    <a href="#otherEnv" data-toggle="tab" onClick={e => this.props.onTabChange(Constants.OTHERENV_SERVICE_TAB)}>
                      <i className="fa fa-2x fa-bar-chart material-icons" aria-hidden="true"></i>
                      &nbsp; Other Env
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>


          {cardContent}
          

        </div>
      </div>
    );
  }

});

Service.propTypes = {
  onTabChange: PropTypes.func.isRequired,
  openCard: PropTypes.func.isRequired,
  closeCard: PropTypes.func.isRequired
}

export default Service;