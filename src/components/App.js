// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home/Home';
import Patientensuche from './patientensuche/Patientensuche';
import About from './about/About';
import Contact from './contact/Contact';
import logo from '../assets/images/ksw-logo.jpg';
import './App.css'  

const App = () => {
  return (
    <>
    <div>
      <img src={logo} alt="KSW Logo" />
    </div>
    <Router>
      <div>
        <nav>
          <ul id="main-nav">
            <li>
              <Link to="/">Home</Link>
            </li> 
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientensuche-questionaire/:pid" element={<Patientensuche />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
