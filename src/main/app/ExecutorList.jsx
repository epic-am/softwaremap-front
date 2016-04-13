import React from 'react';
import Executor from './Executor.jsx';

var ExecutorUtils = require('./utils/ExecutorUtils.jsx');

var ExecutorList = React.createClass({
  getInitialState: function(){       
    return {};
  },

  render: function() {

    var executors = this.props.executors;
    var executorList = <h1>No executor :(</h1>;

    var metadataToDisplay = ["status", "version"];

    var metadataTtiles = metadataToDisplay.map(function(data) {
      return (<th>{data}</th>);
    }); 

    if (executors !== null && executors.length > 0) {
      executorList = executors.map(function(exec){
        return <Executor executor={exec} key={exec.id} />
      });
    }


    var attributesNames = ExecutorUtils.modalAttributes.map(function(attr){
      return <th>attr.key</th>
    });

    var tableKey = "executors-"+this.props.servId;

    return (
      <table className="display" key={tableKey}>
        <thead>
          <tr>
            {attributesNames}
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