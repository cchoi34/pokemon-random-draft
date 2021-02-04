import React from 'react';
import './styles/base.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
}

export default App;