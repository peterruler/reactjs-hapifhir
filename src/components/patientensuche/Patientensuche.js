// src/components/patientensuche-questionaire/Patientensuche-questionaire.js
import React from 'react';
import { useParams } from "react-router";

const Patientensuche = () => {
  let { pid } = useParams();
  return (
    <div>
      <h1>Patientensuche</h1>
      <p>{pid}</p>
    </div>
  );
};

export default Patientensuche;
