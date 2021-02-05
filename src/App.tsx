import React from 'react';
import './styles/base.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-in" component={SignIn} />
      </Router>
    </div>
  );
}

export default App;