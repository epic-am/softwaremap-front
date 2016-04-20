import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { fetchServices } from '../redux/actions'
import ServiceList from '../ServiceList.jsx'

class AppLoader extends Component {

  componentDidMount() {

    const { dispatch } = this.props

    dispatch(fetchServices())
    setInterval(function () {dispatch(fetchServices())}, 60000);
  }

  render() {
    return (
      <div className="section section-tabs">
        <div className="container tim-container text-center">
          <ServiceList services={this.props.services} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    services: state.services,
    is_loading: state.app.loadincleg,
    error: state.app.error
  }
}

export default connect(mapStateToProps)(AppLoader)