import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import App from './App';
import Weather from './components/js/Weather';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
      <Route path="/" component={ App }/>
      <Route path="/weather" component={ Weather } />
    </Router>,
  document.getElementById('root')
);


// <Route path="/graph" component={ Graph } />
