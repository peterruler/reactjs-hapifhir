import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import BirthdayDatePicker from './date-picker/DatePicker';
import { addLoader, removeLoader } from './preloader';

const config = require('../config/config.json');
const BASE_URI = config.base_uri;

const PatientSearchByName = () => {
  const [error] = useState(false);
  const [helperText] = useState("");
  const navigate = useNavigate();

  const performSearch = () => {
    const searchSegments = [];
    const buildSearchSegments = (segments, name, value) => {
      if (value) {
        segments.push(`${name}=${value}`);
      }
      return segments;
    };

    const name2 = document.getElementById("name").value;
    if (!name2 || name2.length < 3) {
      alert("Bitte einen Namen eingeben!");
      return false;
    }

    buildSearchSegments(searchSegments, "name", name2);
    buildSearchSegments(searchSegments, "birthdate", document.getElementById("birthdate").value);

    const searchString = encodeURI(searchSegments.join("&"));

    addLoader();
    fetch(`${BASE_URI}Patient?${searchString}&_pretty=true`)
      .then((response) => response.json())
      .then((result) => {
        removeLoader();
        if (result && result.entry) {
          const pid = result.entry[0].resource.id;
          sessionStorage.setItem("patients", JSON.stringify(result.entry));
          sessionStorage.setItem("patientPID", pid);
          navigate("/patient-list");
        } else {
          console.error("Search didn't return a result!");
        }
      });
  };

  return (
    <div className="cls-search-patient">
      <h1>Patientensuche nach Name</h1>
      <fieldset>
        <legend>Suche</legend>
        <ul>
          <li>
            <TextField
              name="name"
              id="name"
              label="Nachname (oder Vorname)"
              style={{ margin: 8 }}
              margin="normal"
              placeholder="z.B. Hans"
              helperText={helperText}
              error={error}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </li>
          <li className='birthdayPicker'>
            <BirthdayDatePicker />
          </li>
        </ul>
      </fieldset>
      <Button
        onClick={performSearch}
        style={{ marginTop: '15px' }}
        variant="contained"
        color="primary"
        id="search-patient-name"
      >
        Suche Patient
      </Button>
    </div>
  );
};

export default PatientSearchByName;
