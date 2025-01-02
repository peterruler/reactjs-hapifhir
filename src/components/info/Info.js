import React from 'react';
import envConfig from "../../assets/images/env-config.png";
import appConfig from "../../assets/images/app-config.png";

class Info extends React.Component {
    render() {
        return (<div>
            <h1>Info</h1>
            <h3>Bedienung:</h3>
            <ol>
                <li>Einmalig zu Beginn: «Erstelle Questionnaire Ressource»-Schaltfläche drücken.</li>
                <li>In der Patientensuche: Person suchen z,B. «Hans».</li>
                <li>Person auswählen durch drücken einer grauen Schaltfläche, alle nachfolgend ausgewählten Patienten gehören dann zu Ressource aus 1.</li>
                <li>Fragebogen Email eingeben (Pflichtfeld).</li>
                <li>Nachfolgende Regeln umgehen «rules_warning» und nicht mehr als «max_checked_symptoms» wählen.</li>
                <li>Vorsicht: Wenn eine Regel greift (CDS Hooks) dann wird eine Email an die angegebene Adresse gesendet!</li>
                <li>Wählen der Symptome & Krankheiten, dann absenden!</li>
                <li>Statistik einsehen.</li>
            </ol>            
            <h3>Die Questionnaire App hat folgende Konfiguration</h3>
        <img className="config-screen" src={envConfig} width="837" height="201" alt="env config screenshot"/>
        <p>Die Uri Parameter und Port werden für Links, Ajax Anfragen und den Nodemailer benötigt.</p>
        <hr />
        <img className="config-screen" src={appConfig} width="731" height="364" alt="app config screenshot"/>
        <p>Die «rules_warning» Regel legt fest, welche Kombinationen von Symptomen und Krankheiten die Warnungs-Benachrichtigung auslösen.</p>
        <p>Der «max_checked_symptoms» Parameter legt eine Schwelle fest, ab welcher Anzahl gewählter Symptome und Krankheiten eine Warnnachricht gesendet werden soll. </p>
        <p>Felder, die keinen Einfluss auf die Benachrichtigung haben sollen, werden mittels «exclude_symptoms» ausgeschlossen.</p>
        <hr/>
        <b>HINWEIS: Für die Patientensuche muss das Formular ausgefüllt werden, sodass eine Suche durchgeführt werden kann.</b>
        </div>
        );
    }
}
export default Info;