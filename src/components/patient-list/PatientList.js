import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PatientRow from '../patient-row/PatientRow';
import Questionnaire from '../questionnaire/questionnaire.js';

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Logic for fetching data when the component mounts
    const storedPatients = JSON.parse(localStorage.getItem("patients"));
    if (storedPatients) {
      setPatients(storedPatients);
    }
  }, []);

  return (
    <div className="container-fluid">
      <ul id="questionnaire-list" className="media-list">
        {patients.map((patient) => (
          <PatientRow
            key={patient.resource.id}
            id={patient.resource.id}
            ressourceType={patient.resource.ressourceType}
            name={`${patient.resource.name[0].family} ${patient.resource.name[0].given}`}
            birthDate={patient.resource.birthDate}
            gender={patient.resource.gender}
            linkTo={`/questionnaire/${patient.resource.id}/someQuestionnaireId`}
          />
        ))}
      </ul>
    </div>
  );
};

export default PatientsList;