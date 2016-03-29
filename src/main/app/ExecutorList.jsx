import React from 'react';
import Executor from './Executor.jsx';

var ExecutorList = React.createClass({
  getInitialState: function(){       
    return {};
  },

  render: function() {

    var executors = this.props.executors;
    var executorList = <h1>No executor :(</h1>;

    if (executors !== null && executors.length > 0) {
      executorList = executors.map(function(exec){
        return <Executor executor={exec} key={exec.id} />
      });
    }

    return (
      <table className="display">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {executorList}
        </tbody>
      </table>
    );
  }
});

export default ExecutorList;