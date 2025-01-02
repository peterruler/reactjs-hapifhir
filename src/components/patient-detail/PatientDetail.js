import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'date-fns';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MaterialUIPickers from './date-picker/DatePicker';
import Select from './select/SimpleSelect';

function PatientDetail() {
  const [patient, setPatient] = useState({});
  const navigate = useNavigate();

  // Fetch patient data from localStorage on mount
  useEffect(() => {
    const patientObj = JSON.parse(localStorage.getItem('patient'));
    setPatient(patientObj || {});
  }, []);

  // Check if the patient object is empty
  const isEmpty = (obj) => Object.keys(obj).length === 0;

  // Navigate to another route when "choose patient" is clicked
  const choosePatient = () => {
    navigate('/questionnaire'); // Replace '/next-page' with your target route
  };

  if (isEmpty(patient)) {
    return <div>Patient ist leer!</div>;
  }

  return (
    <div>
      <fieldset>
        <legend>Patient Prüfen</legend>
        <TextField
          id="pid"
          label="Patienten-ID"
          style={{ margin: 8 }}
          value={patient.id || ''}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          id="firstname"
          label="Vornamen"
          style={{ margin: 8 }}
          value={patient.name?.[0]?.given?.[0] || ''}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <TextField
          id="lastname"
          label="Nachname"
          style={{ margin: 8 }}
          value={patient.name?.[0]?.family || ''}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br />
        <MaterialUIPickers />
        <Select />
      </fieldset>
      <Button
        onClick={choosePatient}
        style={{ marginTop: '15px' }}
        variant="contained"
        color="primary"
      >
        Patient wählen
      </Button>
    </div>
  );
}

export default PatientDetail;
