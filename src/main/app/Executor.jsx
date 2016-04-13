import React from 'react';

var ExecutorUtils = require('./utils/ExecutorUtils.jsx');


var Executor = React.createClass({

  render: function() {

    var executor = this.props.executor;

    var modalAttributes = ExecutorUtils.modalAttributes;
    var attr;

    var attributesList = [];

    for (var i = 0; i < modalAttributes.length; i++) {
      attr = modalAttributes[i];

      var toStringCallback = attr.toStringCallback ? attr.toStringCallback : ExecutorUtils.simpleToString;
      var attrValue = toStringCallback.call(this, executor, attr.key);


      attributesList.push(attrValue);
    }

    var attributesDisplay = attributesList.map(function(attrName) {
      return (
        <td>
          {attrName}
        </td>
        );
    });
      

    return (
      <tr className="odd">
        {attributesDisplay}
      </tr>
    );

  }

});

export default Executor;