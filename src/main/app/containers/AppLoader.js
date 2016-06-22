import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { fetchServices, openEnvServiceCards, closeEnvServiceCards, openEnvCard, closeEnvCard } from '../redux/actions'
import ServiceList from '../components/ServiceList.jsx'

var _ = require('lodash');
var Constants = require('../utils/Constants.jsx');
var EnvUtils = require('../utils/EnvUtils.jsx');

class AppLoader extends Component {

  constructor(props) {
    super(props)
    this.openServCardFunction = this.openServCardFunction.bind(this)
    this.closeServCardFunction = this.closeServCardFunction.bind(this)

    this.openEnvCardFunction = this.openEnvCardFunction.bind(this)
    this.closeEnvCardFunction = this.closeEnvCardFunction.bind(this)
  }

  componentDidMount() {

    const { dispatch } = this.props

    dispatch(fetchServices())
    setInterval(function () {dispatch(fetchServices())}, 60000);
  }

  openServCardFunction(env) {
    this.props.dispatch(openEnvServiceCards(env));
  }

  closeServCardFunction(env) {
    this.props.dispatch(closeEnvServiceCards(env));
  }

  openEnvCardFunction(env) {
    this.props.dispatch(openEnvCard(env));
  }

  closeEnvCardFunction(env) {
    this.props.dispatch(closeEnvCard(env));
  }

  render() {

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

      var services = this.props.services;
      var filteredServices;
      var closeServCardFunction = this.closeServCardFunction;
      var openServCardFunction = this.openServCardFunction;
      var closeEnvCardFunction = this.closeEnvCardFunction;
      var openEnvCardFunction = this.openEnvCardFunction;
      var envProps = this.props.envProps;

      env = EnvUtils.sortEnv(env);
      servicesBlocks = env.map(function(e) { 
        var envCardOpen = true;
        for (var i = 0; i < envProps.length; i++) {
          if (envProps[i].name == e) {
            envCardOpen = envProps[i].isOpen;
          }
        }

        filteredServices = services.filter( function(serv){ 
          return serv.env == e;
        });

        var title = env.length == 1 ? undefined : (<h1 className="text-center">{e}</h1>);


        var openCloseAllCardsButton;
        if (filteredServices.some(s => s.card_open)) {
          openCloseAllCardsButton = (<i className="allCards serviceCardMaxMin material-icons md-48" title="Reduce all services" onClick={ev => closeServCardFunction(e)}>fullscreen_exit</i>)
        } else {
          openCloseAllCardsButton = (<i className="allCards serviceCardMaxMin material-icons md-48" title="Maximize all services" onClick={ev => openServCardFunction(e)}>fullscreen</i>)
        }

        var openCloseEnvCardButton;
        var containerDiv = (<div className="container tim-container text-center"><h3>This should not be seen</h3></div>);
        if (envCardOpen) {
          openCloseEnvCardButton = (<i className="envCard envCardMaxMin material-icons md-48" title="Reduce environment card" onClick={ev => closeEnvCardFunction(e)}>keyboard_arrow_up</i>);
          containerDiv = (<div className="section section-tabs"><div className="container tim-container text-center"><ServiceList title="Maximize environment card" services={filteredServices} /></div></div>);
        } else {
          openCloseEnvCardButton = (<i className="envCard envCardMaxMin material-icons md-48" onClick={ev => openEnvCardFunction(e)}>keyboard_arrow_down</i>);
                var contentDisplayNone = {display: "none"};
          containerDiv = (<div className="section section-tabs" style={contentDisplayNone} />);
        }


        return(
          <div key={e} className="main main-raised">
            {title}
            {openCloseAllCardsButton}
            {openCloseEnvCardButton}
            {containerDiv}
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
    envProps: state.envProps,
    is_loading: state.app.is_loading,
    error: state.app.error
  }
}

export default connect(mapStateToProps)(AppLoader)