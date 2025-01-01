// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home/Home';
import Patientensuche from './patientensuche/Patientensuche';
import About from './about/About';
import Contact from './contact/Contact';
import PatientDetail from './patient-detail/PatientDetail.js'
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
              <Link to="/">Start</Link>
            </li> 
            <li>
              <Link to="/patientensuche-questionaire/-1">Suche nach Pid</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientensuche-questionaire/:PID" element={<Patientensuche />} />
          <Route path="/patient-detail" element={<PatientDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
