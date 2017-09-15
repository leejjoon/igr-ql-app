import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import './index.css';
import App from './App';
import Home from './Home';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <Router>
    <div>
      <h2>QuickLook</h2>
      <Route exact path="/" component={Home}/>
      <Route path="/current" component={App}/>
      <Route path="/obsdate/:obsdate" component={App}/>
    </div>
  </Router>,
  document.getElementById('root')
);

registerServiceWorker();
