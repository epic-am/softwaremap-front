import React, { Component } from 'react'

import { connect } from 'react-redux'

import { changeServiceTab, openServiceCard, closeServiceCard } from '../redux/actions'

import Service from '../components/Service.jsx'

class ServiceContainer extends Component {
  constructor(props) {
    super(props)
    this.handleTabChange = this.handleTabChange.bind(this)
    this.handleCardOpen = this.handleCardOpen.bind(this)
    this.handleCardClose = this.handleCardClose.bind(this)
  }

  handleTabChange(tab_name) {
    this.props.dispatch(changeServiceTab(this.props.serv.id, tab_name));
  }

  handleCardOpen() {
    this.props.dispatch(openServiceCard(this.props.serv.id));
  }

  handleCardClose() {
    this.props.dispatch(closeServiceCard(this.props.serv.id));
  }



  render() {
    return (
      <Service serv={this.props.serv} onTabChange={this.handleTabChange} openCard={this.handleCardOpen} closeCard={this.handleCardClose} />
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(ServiceContainer)