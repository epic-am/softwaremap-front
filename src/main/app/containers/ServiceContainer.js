import React, { Component } from 'react'

import { connect } from 'react-redux'

import { changeServiceTab } from '../redux/actions'

import Service from '../components/Service.jsx'

class ServiceContainer extends Component {
  constructor(props) {
    super(props)
    this.handleTabChange = this.handleTabChange.bind(this)
  }

  handleTabChange(tab_name) {
    this.props.dispatch(changeServiceTab(this.props.serv.id, tab_name));
  }



  render() {
    return (
      <Service serv={this.props.serv} onTabChange={this.handleTabChange} />
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(ServiceContainer)