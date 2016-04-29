import React from 'react';

var ExecutorUtils = require('../utils/ExecutorUtils.jsx');


var Executor = React.createClass({

  render: function() {

    var executor = this.props.executor;

    var attributesToDisplay = ExecutorUtils.attributesToDisplay;
    var attr;

    var attributesList = [];

    for (var i = 0; i < attributesToDisplay.length; i++) {
      attr = attributesToDisplay[i];

      var toStringCallback = attr.toStringCallback ? attr.toStringCallback : ExecutorUtils.simpleToString;
      var attrValue = toStringCallback.call(this, executor, attr.key);


      attributesList.push(attrValue);
    }

    var attributesDisplay = attributesList.map(function(attrName) {
      var objKey = executor.id + "-" + attrName
      return (
        <td className="text-center" key={objKey}>
          {attrName}
        </td>
        );
    });
      

    return (
      <tr>
        {attributesDisplay}
      </tr>
    );

  }

});

export default Executor;