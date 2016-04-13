import React from 'react';

import ExecutorList from './ExecutorList.jsx';

var ServiceModal = React.createClass({

  render: function() {

    return (
        <div className="modal-content">
          <div className="modal-header">
            Executors of {this.props.serv.name}
          </div>
          <div className="modal-body">
            <ExecutorList servId={this.props.serv.id} executors={this.props.serv.executors} />
          </div>
          <div className="modal-footer">
            <button onClick={this.props.closeCallback}>close</button>
          </div>
        </div>
    );
  }
});

export default ServiceModal;