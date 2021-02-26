import React, { useState, useEffect } from 'react';
import './styles/base.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch, 
  Redirect, 
} from 'react-router-dom';
import * as userAuthUtils from './utils/userAuthUtils';
import Home from './components/Home';
import SignIn from './components/SignIn';
import CreateAccount from './components/CreateAccount';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StartSequenceDraftPresets from './components/StartSequenceDraftPresets';
import StartSequenceSelectAPokemon from './components/StartSequenceSelectAPokemon';
import YourPokemon from './components/YourPokemon';
import NotFound404 from './components/NotFound404';

function App() {
  const [userToken, setUserToken] = useState(userAuthUtils.getUserAuthToken());
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/create-account" component={CreateAccount} />
          <Route exact path="/start-sequence" component={StartSequenceDraftPresets} />
          <Route exact path="/start-sequence/select-a-pokemon" component={StartSequenceSelectAPokemon} />
          <Route exact path="/start-sequence/your-pokemon" component={YourPokemon} />
          <Route exact path="/not-found-404" component={NotFound404} />
          <Redirect to="/not-found-404" />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;