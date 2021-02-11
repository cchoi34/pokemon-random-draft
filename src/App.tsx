import React, { useState, useEffect } from 'react';
import './styles/base.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as userAuthUtils from './utils/userAuthUtils';
import Home from './components/Home';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Navbar from './components/Navbar';
import StartSequenceDraftPresets from './components/StartSequenceDraftPresets';

function App() {
  const [userToken, setUserToken] = useState(userAuthUtils.getUserAuthToken());
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/create-account" component={CreateAccount} />
        <Route exact path="/start-sequence" component={StartSequenceDraftPresets} />
      </Router>
    </div>
  );
}

export default App;