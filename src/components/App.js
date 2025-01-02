// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home/Home';
import Patientensuche from './patientensuche/Patientensuche';
import About from './about/About';
import Contact from './contact/Contact';
import PatientSearchByName from './patient-search-by-name/PatientSearchByName.js'
import PatientDetail from './patient-detail/PatientDetail.js'
import Questionnaire from './questionnaire/questionnaire'
import PatientList from './patient-list/PatientList.js'
import SuccessPage from './success-page/SuccessPage.js'
import Stats from './stats/Stats.js'
import Info from './info/Info.js'
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
              <Link to="/patient-search-by-name">Suche nach Patientenname</Link>
            </li>
            <li>
              <Link to="/stats">Statistik</Link>
            </li>
            <li>
              <Link to="/info">Info</Link>
            </li>
            <li>
              <Link to="/contact">Kontakt</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patientensuche-questionaire/:PID" element={<Patientensuche />} />
          <Route path="/patient-search-by-name/" element={<PatientSearchByName />} />
          <Route path="/patient-detail" element={<PatientDetail />} />
          <Route path="/questionnaire/*" element={<Questionnaire />} />
          <Route path="/patient-list/*" element={<PatientList />} />
          <Route path="/about" element={<About />} />
          <Route path="/success-page" element={<SuccessPage />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/info" element={<Info />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
