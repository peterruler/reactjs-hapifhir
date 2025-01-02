import React from 'react';
import { Link } from 'react-router-dom';

const QUESTIONNAIRE_ID = 1;

const formatDate = (input) => {
  const datePart = input.match(/\d+/g);
  const year = datePart[0];
  const month = datePart[1];
  const day = datePart[2];

  return `${day}.${month}.${year}`;
};

const PatientRow = ({ id, name, given, birthDate, gender }) => {
  const formattedBirthDate = formatDate(birthDate || "1848-01-01");
  const genderText =
    gender === "male" ? "männlich" : gender === "female" ? "weiblich" : "other";

  const handleSaveToLocalStorage = () => {
    localStorage.setItem("patientPID", id);
    localStorage.setItem("patientQID", QUESTIONNAIRE_ID);
  };

  return (
    <li className="patient-item" style={{ listStyleType: "none" }}>
      <div className="media-body">
        <Link
          to={`/questionnaire/${id}/${QUESTIONNAIRE_ID}`}
          className="redirect-btn"
          onClick={handleSaveToLocalStorage}
        >
<button class="redirect-btn" type="button">#{id}  <span>&nbsp;|&nbsp;</span>
{given} {name} - {formattedBirthDate}&nbsp;{genderText}</button>
        </Link>
      </div>
    </li>
  );
};

export default PatientRow;
