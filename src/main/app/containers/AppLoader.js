import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { fetchServices, openAllServiceCards, closeAllServiceCards } from '../redux/actions'
import ServiceList from '../components/ServiceList.jsx'

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

    return (
      <div className="section section-tabs">
        {openCloseAllCardsButton}
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
    is_loading: state.app.is_loading,
    error: state.app.error
  }
}

export default connect(mapStateToProps)(AppLoader)