import React from 'react';
import Executor from './Executor.jsx';

var ExecutorUtils = require('../utils/ExecutorUtils.jsx');

var ExecutorList = React.createClass({
  getInitialState: function(){       
    return {};
  },

  render: function() {

    var executors = this.props.executors;
    var executorList = <h3>No executor :(</h3>;

    var metadataToDisplay = ["status", "version"];

    var metadataTitles = metadataToDisplay.map(function(data) {
      return (<th>{data}</th>);
    }); 

    if (executors !== null && executors !== undefined && executors.length > 0) {
      executorList = executors.map(function(exec){
        return <Executor executor={exec} key={exec.id} />
      });
    } else {
      return executorList
    }


    var attributesNames = ExecutorUtils.attributesToDisplay.map(function(attr){
      return <th className="text-center" key={attr.key}>{attr.key}</th>
    });

    var tableKey = "executors-"+this.props.servId;

    return (
      <table className="table" key={tableKey}>
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