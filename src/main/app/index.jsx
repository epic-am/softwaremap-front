import React from 'react';
import {render} from 'react-dom';

import CategoryList from './CategoryList.jsx';

class App extends React.Component {
  render () {
    return <CategoryList baseUrl='http://127.0.0.1:3000/api/' updateInterval={600000} />;
  }
}

render(<App/>, document.getElementById('app'));