// src/components/home/Home.js
import * as React from 'react';
import { NavLink } from "react-router";
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import SendIcon from '@mui/icons-material/Send';

const CONFIG = require('../config/config.json');
const PATH = CONFIG.base_uri;
const createSampleData = () => {
    const questionnaireJSON = require('../config/questionnaire.json');
    questionnaireJSON.url = "https://hapi.fhir.org/baseR4/Questionnaire/2569991?_pretty=true";
    const URL = PATH + 'Questionnaire?_format=json&_pretty=true';
    fetch(URL, {//NOTE: Cached http:// protocol leads to error
      method: 'POST', // or 'PUT'
      headers: {
      'Content-Type': 'application/fhir+json;charset=utf-8',
      },
      body: JSON.stringify(questionnaireJSON),
  })
  .then(response => response.json())
  .then(data => {
    let pruleid = data.id;
    alert("Success, the generated rule id is: " + pruleid);
    localStorage.setItem("QuestionnaireRuleID", pruleid);
  })
  .catch((error) => {
      alert("Erstellen der Qwestionnaire Resource fehlgeschlagen! Error: " + error + " " + URL);
  });
}
const Home = () => {
  const marginSendBtn = {'marginTop': '15px'};
  let PID  = localStorage.getItem("QuestionnaireRuleID");
  return (
    <div>
      <h1>Home Page</h1>
        <nav id="vert-nav">
                <Button onClick={createSampleData} style={marginSendBtn} variant="contained" color="primary"  endIcon={<SendIcon />}>ERSTELLE QUESTIONNAIRE RESOURCE</Button>
                <br />
                <Link to={`/patient-search-by-name/`} className="patientensuche-link">
                <span className="arrow">
                    <ArrowRightIcon />&nbsp;
                </span>
                Patientensuche & Questionnaire
                </Link>
                <br />
                <NavLink to="https://hapi.fhir.org/baseR4"><span className="arrow"><ArrowRightIcon/>&nbsp;</span>Hapi FHIR Client</NavLink>
        </nav>
    </div>
  );
};

export default Home;
