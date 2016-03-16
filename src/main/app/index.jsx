import React from 'react';
import {render} from 'react-dom';

import ServiceList from './ServiceList.jsx';

class App extends React.Component {
  render () {
    return <ServiceList baseUrl='http://127.0.0.1:3000/api/'  />;
  }
}

render(<App/>, document.getElementById('app'));