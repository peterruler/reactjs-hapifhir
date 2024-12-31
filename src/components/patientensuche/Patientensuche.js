import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';

const Patientensuche = () => {
  const navigate = useNavigate();
  
  let { QID } = useParams();

  let PID = -1; // test id is 596528

  const [data, setData] = useState({
    error: false,
    helperText: "",
    PID: ""
  });

  const marginSendBtn = { 'marginTop': '15px' };

  const config = require('../config/config.json');
  const BASE_URI = config.base_uri;

  let isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
  }
  const performSearch = () => {
    const { PID } = data;

    if (typeof(PID) !== 'undefined' && PID !== '') {
      fetch(BASE_URI + 'Patient/' + PID + '?_format=json&_pretty=true')
        .then((response) => response.json())
        .then((result) => {
          if (!isEmpty(result) && result.resourceType === 'Patient') {
            localStorage.setItem("patient", JSON.stringify(result));

            setData({
              helperText: "",
              error: false,
              PID: result.id
            });

            localStorage.setItem("patientPID", result.id);

            navigate('/next-page');
          } else {
            setData({
              helperText: "Patient mit dieser PID existiert nicht!",
              error: true,
              PID: ""
            });
          }
        });
    }
  }

  const handleChange = (event) => {
    setData({
      ...data,
      PID: event.target.value
    });
  };

  return (
    <div>
      <h1>Patientensuche</h1>
      <fieldset>
        <legend>Suche nach PID</legend>
        <TextField
          id="pid"
          label="Patienten-ID"
          style={{ margin: 8 }}
          placeholder=""
          margin="normal"
          helperText={data.helperText}
          error={data.error}
          value={data.PID}
          onChange={handleChange}
        />
        <Button
          onClick={performSearch}
          style={marginSendBtn}
          variant="contained"
          color="primary"
          id="search-patient-name"
          label="Suchen"
        >
          Suche Patient
        </Button>
      </fieldset>
    </div>
  );
};

export default Patientensuche;
