import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import App from './App';
import Home from './Home';
import Feedback from './Feedback';

const Parent = () => {

    return (
      <Router>
          <Switch>
              <Route exact path='/' component={App} />
              <Route path='/home' component={Home} />
              <Route path='/feedback' component={Feedback} />
          </Switch>
      </Router>
    );
  }
  
  export default Parent;