import React, { useState } from 'react';
import { FormControlLabel, TextField, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import StartDayDatePicker from './date-picker/DatePicker';
import { useNavigate } from "react-router-dom";

const config = require('../config/config.json');
const BASE_URI = config.base_uri;
const BASE_URL_Q = `${BASE_URI}QuestionnaireResponse?_format=json&_pretty=true`;

const Questionnaire = (props) => {
  const [state, setState] = useState({
    checked_covid19_001: props.value || false,
    checked_covid19_01: props.value || false,
    checked_covid19_02: props.value || false,
    checked_covid19_03: props.value || false,
    checked_covid19_04: props.value || false,
    checked_covid19_05: props.value || false,
    checked_covid19_06: props.value || false,
    checked_covid19_07: props.value || false,
    checked_covid19_09: props.value || false,
    checked_covid19_10: props.value || false,
    checked_covid19_11: props.value || false,
    checked_diabetes_01: props.value || false,
    checked_chronical_kidney_02: props.value || false,
    checked_chronical_respiratory_disease_03: props.value || false,
    checked_smoker_04: props.value || false,
    checked_cardiovascular_disease_05: props.value || false,
    checked_high_bloodpressure_06: props.value || false,
    checked_overweight_07: props.value || false,
    checked_pregnant_08: props.value || false,
    checked_immunosuppression_09: props.value || false,
    checked_cancer_10: props.value || false,
    checked_none_11: props.value || false,
    helperText: "",
    error: false,
    successAlertVisible: false,
  });

  const navigate = useNavigate();
  const pid = sessionStorage.getItem("patientPID");
  const qid = sessionStorage.getItem("patientQID");
  const handleChangeTextField = (event, fieldName) => {
    setState((prev) => ({ ...prev, [fieldName]: event.target.value }));
  };
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setState((prev) => ({ ...prev, [name]: checked }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const resetSessionStorage = () => {
    sessionStorage.clear();
    setTimeout(() => {
      navigate("/success-page");
    }, 5000);
  };

  const sendFormQ1 = () => {
    console.log("submit");
    const emailaddr = document.getElementById("email-address").value;
    const emailIsValid = validateEmail(emailaddr);

    if (!emailIsValid || emailaddr === "") {
      setState((prev) => ({ ...prev, helperText: "Bitte gültige E-Mail eingeben!", error: true }));
      alert("Bitte gültige E-Mail eingeben");
      return;
    }

    const questionRespJSON = require('./jsons/questionaireResponse02.json');
    questionRespJSON.subject.reference = `Patient/${pid}`;
    questionRespJSON.questionnaire = `Questionnaire/${sessionStorage.getItem("QuestionnaireRuleID")}`;
    questionRespJSON.authored = new Date().toISOString();

    fetch(BASE_URL_Q, {
      method: 'POST',
      headers: { 'Content-Type': 'application/fhir+json;charset=utf-8' },
      body: JSON.stringify(questionRespJSON),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success, the generated id is: " + data.id);
        setState((prev) => ({ ...prev, successAlertVisible: true }));
        resetSessionStorage();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("Senden des Fragebogens fehlgeschlagen! Error: " + error);
      });
  };

  return (
    <fieldset>
      <GotoStartRedirect />
      <legend>Covid-19 Fragebogen #{qid} - Patient mit PID: {pid}</legend>
      <ul>
        <li>
          <TextField
            id="email-address"
            helperText={state.helperText}
            error={state.error}
            label="E-Mail-Adresse"
          />
        </li>
        <li>
          <FormControlLabel
            control={
              <Checkbox
                id="q1-covid19-no-symptoms"
                checked={state.checked_covid19_001}
                onChange={handleChange}
                name="checked_covid19_001"
                color="primary"
              />
            }
            label="Keine Symptome"
          />
        </li>
        <li>
          <StartDayDatePicker />
        </li>
            <li><h4>Symptome:</h4></li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-fever-01"
                checked={state.checked_covid19_01}
                onChange={handleChange}
                name="checked_covid19_01"
                color="primary"
            />
            }
            label="Fieber > 38℃"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-headache-02"
                checked={state.checked_covid19_02}
                onChange={handleChange}
                name="checked_covid19_02"
                color="primary"
            />
            }
            label="Kopfschmerzen"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-magendarm-03"
                checked={state.checked_covid19_03}
                onChange={handleChange}
                name="checked_covid19_03"
                color="primary"
            />
            }
            label="Magen-/Darm Beschwerden"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-hautausschlaege-04"
                checked={state.checked_covid19_04}
                onChange={handleChange}
                name="checked_covid19_04"
                color="primary"
            />
            }
            label="Hautauschläge"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-caugh-05"
                checked={state.checked_covid19_05}
                onChange={handleChange}
                name="checked_covid19_05"
                color="primary"
            />
            }
            label="Husten"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-breastache-06"
                checked={state.checked_covid19_06}
                onChange={handleChange}
                name="checked_covid19_06"
                color="primary"
            />
            }
            label="Brustschmerzen"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-lossoftaste-07"
                checked={state.checked_covid19_07}
                onChange={handleChange}
                name="checked_covid19_07"
                color="primary"
            />
            }
            label="Geruchs- oder Geschmacksverlust"
            />
            </li>
            <li>
           <TextField
          id="q1-covid19-symptoms-other-08"
          multiline
          rowsMax={20}
          rows={5}
          size={'medium'}
          value={state.textArea_covid19_08}
          onChange={handleChangeTextField}
          variant="outlined"
          label="Andere Symptome: (Symptom1, Symptom2, etc)?"
        />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-breathingproblems-09"
                checked={state.checked_covid19_09}
                onChange={handleChange}
                name="checked_covid19_09"
                color="primary"
            />
            }
            label="Atembeschwerden"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-halsschmerzen-10"
                checked={state.checked_covid19_10}
                onChange={handleChange}
                name="checked_covid19_10"
                color="primary"
            />
            }
            label="Halsschmerzen"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-musclepain-11"
                checked={state.checked_covid19_11}
                onChange={handleChange}
                name="checked_covid19_11"
                color="primary"
            />
            }
            label="Muskelschmerzen"
            />
            </li>
            <li><h4>Grunderkrankungen:</h4></li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-diabetes-01"
                checked={state.checked_diabetes_01}
                onChange={handleChange}
                name="checked_diabetes_01"
                color="primary"
            />
            }
            label="Diabetes"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-chronical-kidney-02"
                checked={state.checked_chronical_kidney_02}
                onChange={handleChange}
                name="checked_chronical_kidney_02"
                color="primary"
            />
            }
            label="Chronische Nierenerkrankung"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-chronical-respiratory-disease-03"
                checked={state.checked_chronical_respiratory_disease_03}
                onChange={handleChange}
                name="checked_chronical_respiratory_disease_03"
                color="primary"
            />
            }
            label="Chronische Atemwegserkrankung"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-smoker-04"
                checked={state.checked_smoker_04}
                onChange={handleChange}
                name="checked_smoker_04"
                color="primary"
            />
            }
            label="Raucher"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-cardiovascular-disease-05"
                checked={state.checked_cardiovascular_disease_05}
                onChange={handleChange}
                name="checked_cardiovascular_disease_05"
                color="primary"
            />
            }
            label="Herz-Kreislauf-Erkrankung"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-high-bloodpessure-06"
                checked={state.checked_high_bloodpressure_06}
                onChange={handleChange}
                name="checked_high_bloodpressure_06"
                color="primary"
            />
            }
            label="Hoher Blutdruck"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-overweight-07"
                checked={state.checked_overweight_07}
                onChange={handleChange}
                name="checked_overweight_07"
                color="primary"
            />
            }
            label="Übergewicht (BMI >35)"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-pregnant-08"
                checked={state.checked_pregnant_08}
                onChange={handleChange}
                name="checked_pregnant_08"
                color="primary"
            />
            }
            label="Schwanger"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-immunosuppression-09"
                checked={state.checked_immunosuppression_09}
                onChange={handleChange}
                name="checked_immunosuppression_09"
                color="primary"
            />
            }
            label="Immunsuppression"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-cancer-10"
                checked={state.checked_cancer_10}
                onChange={handleChange}
                name="checked_cancer_10"
                color="primary"
            />
            }
            label="Krebs"
            />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-none-11"
                checked={state.checked_none_11}
                onChange={handleChange}
                name="checked_none_11"
                color="primary"
            />
            }
            label="Keine Vorerkrankungen"
            />
            </li>
            <li>
            <TextField
            id="q1-other-disease-12"
            multiline
            rowsMax={20}
            rows={5}
            size={'medium'}
            value={state.textArea_disease_other_12}
            onChange={handleChange}
            variant="outlined"
            label="Andere: (Krankheit1, Krankheit2, etc)?"
            />
            </li>
        <li>
          {state.successAlertVisible && (
            <Alert id="successAlertBottom" severity="success">Formular erfolgreich gesendet!</Alert>
          )}
        </li>
        <li>
          <Button onClick={sendFormQ1} variant="contained" color="primary" id="questionaire-q1" label="Absenden">
            Fragebogen absenden
          </Button>
        </li>
      </ul>
    </fieldset>
  );
};

const GotoStartRedirect = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/success-page");
  };

  return null;
};

export default Questionnaire;
