import React from 'react';

var Executor = React.createClass({

  render: function() {

    return (

        <tr className="odd">
          <td>{this.props.executor.name}</td>
        </tr>
    );
  }

});

export default Executor;