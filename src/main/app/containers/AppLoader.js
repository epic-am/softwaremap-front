import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { fetchServices, openAllServiceCards, closeAllServiceCards } from '../redux/actions'
import ServiceList from '../components/ServiceList.jsx'

var _ = require('lodash');
var Constants = require('../utils/Constants.jsx');
var EnvUtils = require('../utils/EnvUtils.jsx');

class AppLoader extends Component {

  constructor(props) {
    super(props)
    this.openAllCards = this.openAllCards.bind(this)
    this.closeAllCards = this.closeAllCards.bind(this)
  }

  componentDidMount() {

    const { dispatch } = this.props

    dispatch(fetchServices())
    setInterval(function () {dispatch(fetchServices())}, 10000);
  }

  openAllCards() {
    this.props.dispatch(openAllServiceCards());
  }

  closeAllCards() {
    this.props.dispatch(closeAllServiceCards());
  }

  render() {

    var openCloseAllCardsButton;
    if (this.props.services.some(s => s.card_open)) {
      openCloseAllCardsButton = (<i className="allCards serviceCardMaxMin material-icons md-48" onClick={e => this.closeAllCards()}>keyboard_arrow_up</i>)
    } else {
      openCloseAllCardsButton = (<i className="allCards serviceCardMaxMin material-icons md-48" onClick={e => this.openAllCards()}>keyboard_arrow_down</i>)
    }


    var env = [];

    if (this.props.services !== null && this.props.services != undefined && this.props.services.length > 0) {

      env = this.props.services.map(function(serv){
        if (serv.env === null || serv.env === undefined || _.isEmpty(serv.env)) {
          return Constants.DEFAULT_ENV;
        } else {
          return serv.env;
        }
      });
      env = _.uniq(env);
    } 
    
    
    var servicesBlocks = (<div>Nothing to show</div>);

    if (env !== null && env !== undefined && env.length > 0) {

      env = EnvUtils.sortEnv(env);


      var filteredServices;
      var services = this.props.services;

      servicesBlocks = env.map(function(e) { 
        filteredServices = services.filter( function(serv){ 
          return serv.env == e;
        });

        var title = env.length == 1 ? undefined : (<h1 className="text-center">{e}</h1>);

        return(
          <div className="main main-raised">
            {title}
            <div className="section section-tabs">
              {openCloseAllCardsButton}
              <div className="container tim-container text-center">
                <ServiceList services={filteredServices} />
              </div>
            </div>
          </div>);
      });
    }

    return (
      <div>{ servicesBlocks }</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    services: state.services,
    is_loading: state.app.is_loading,
    error: state.app.error
  }
}

export default connect(mapStateToProps)(AppLoader)