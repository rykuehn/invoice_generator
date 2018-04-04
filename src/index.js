import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/App';
import Admin from './components/Admin';
import Client from './components/Client';

ReactDOM.render(
  <Router>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/admin" component={Admin} />
        <Route path="/client" component={Client} />
    </div>
  </Router>, document.getElementById("root"));
