import React from 'react';
import { FormControlLabel, TextField, Button, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import StartDayDatePicker from './date-picker/DatePicker';
import { useNavigate } from "react-router-dom";

//global vars/config
const config = require('../config/config.json');
const BASE_URI = config.base_uri;
const BASE_URL_NODE = config.base_uri_node;
const BASE_URL_Q = BASE_URI + "QuestionnaireResponse?_format=json&_pretty=true";
const BASE_URL_MAILER = BASE_URL_NODE;
const algo_config = require('../config/app-config.json');

/* 
HERE: Change to existing Questionnaire ID from HAPI_FHIR Server for this Form
*/
let pruleid = localStorage.getItem("QuestionnaireRuleID") ;

let QUESTIONNAIRE_ID = 1;
if(typeof pruleid !== 'string') {
    QUESTIONNAIRE_ID = pruleid;
}
class Questionnaire extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {};

        this.pid = localStorage.getItem("patientPID");
        this.qid = localStorage.getItem("patientQID");

        //additional
        this.state.checked_covid19_001 = this.props.value || false;
        //@todo date symptoms begin


        //START symptoms
        this.state.checked_covid19_01 = this.props.value || false;
        this.state.checked_covid19_02 = this.props.value || false;
        this.state.checked_covid19_03 = this.props.value || false;
        this.state.checked_covid19_04 = this.props.value || false;
        this.state.checked_covid19_05 = this.props.value || false;
        this.state.checked_covid19_06 = this.props.value || false;
        this.state.checked_covid19_07 = this.props.value || false;
        //no this.state.textArea_covid19_08
        this.state.checked_covid19_09 = this.props.value || false;
        this.state.checked_covid19_10 = this.props.value || false;
        this.state.checked_covid19_11 = this.props.value || false;
        //END symptoms

        //START base disease
        this.state.checked_diabetes_01 = this.props.value || false;
        this.state.checked_chronical_kidney_02 = this.props.value || false;
        this.state.checked_chronical_respiratory_disease_03 = this.props.value || false;
        this.state.checked_smoker_04 = this.props.value || false;
        this.state.checked_cardiovascular_disease_05 = this.props.value || false;
        this.state.checked_high_bloodpressure_06 = this.props.value || false;
        this.state.checked_overweight_07 = this.props.value || false;
        this.state.checked_pregnant_08 = this.props.value || false;
        this.state.checked_immunosuppression_09 = this.props.value || false;
        this.state.checked_cancer_10 = this.props.value || false;
        this.state.checked_none_11 = this.props.value || false;
        //textarea none
        //END base disease
    }
    
    handleChangeTextField = (event) => {//q8 textffield symtoms
        this.setState({state: {
            textArea_covid19_08: event.target.value
        }
          });
          this.q8 = document.getElementById("q1-covid19-symptoms-other-08").value;
          console.info("Changed")
    }

    handleChangeTextFieldBaseDisease = (event) => {//q20 other disease
        this.setState({state: {
            textArea_disease_other_12: event.target.value
        }
          });
          this.q23 = document.getElementById("q1-other-disease-12").value;
          console.info("Changed")
    }

    handleChange = (event, isChecked, value) => {
        console.info("Handle Change Switch name= " + event.target.name);
        this.setState({ ...this.state, [event.target.name]: event.target.checked });
        switch(event.target.name) {
            //additional
            case 'checked_covid19_001':
                this.q001 = event.target.checked;
            break;
            //@todo start symptoms date

            //START SYMPTOMS
            case 'checked_covid19_01':
                this.q1 = event.target.checked;
            break;
            case 'checked_covid19_02':
                this.q2 = event.target.checked;
            break;
            case 'checked_covid19_03':
                this.q3 = event.target.checked;
            break;
            case 'checked_covid19_04':
                this.q4 = event.target.checked;
            break;
            case 'checked_covid19_05':
                this.q5 = event.target.checked;
            break;
            case 'checked_covid19_06':
                this.q6 = event.target.checked;
            break;
            case 'checked_covid19_07':
                this.q7 = event.target.checked;
            break;
            case 'checked_covid19_09':
                this.q9 = event.target.checked;
            break;
            case 'checked_covid19_10':
                this.q10 = event.target.checked;
            break;
            case 'checked_covid19_11':
                this.q11 = event.target.checked;
            break;
            //END Symptoms

            //START BASE DISEASE
            case 'checked_diabetes_01':
                this.q12 = event.target.checked;
            break;
            case 'checked_chronical_kidney_02':
                this.q13 = event.target.checked;
            break;
            case 'checked_chronical_respiratory_disease_03':
                this.q14 = event.target.checked;
            break;
            case 'checked_smoker_04':
                this.q15 = event.target.checked;
            break;
            case 'checked_cardiovascular_disease_05':
                this.q16 = event.target.checked;
            break;
            case 'checked_high_bloodpressure_06':
                this.q17 = event.target.checked;
            break;
            case 'checked_overweight_07':
                this.q18 = event.target.checked;
            break;
            case 'checked_pregnant_08':
                this.q19 = event.target.checked;
            break;
            case 'checked_immunosuppression_09':
                this.q20 = event.target.checked;
            break;
            case 'checked_cancer_10':
                this.q21 = event.target.checked;
            break;
            case 'checked_none_11':
                this.q22 = event.target.checked;
            break;
            //END BASE DISEASE
            default:
                //do nothing
        }
    }

    sendFormQ1 = () => {
            console.log("submit");
            //additional no symptoms
            this.q001 = (document.getElementById("q1-covid19-no-symptoms").checked) ? true : false;
            this.q002 = document.getElementById("start_symptoms").value;

            //START SYMPTOMS
            this.q1 = (document.getElementById("q1-covid19-fever-01").checked) ? true : false;
            this.q2  = (document.getElementById("q1-covid19-headache-02").checked) ? true : false;
            this.q3 = (document.getElementById("q1-covid19-magendarm-03").checked) ? true : false;
            this.q4 = (document.getElementById("q1-covid19-hautausschlaege-04").checked) ? true : false;
            this.q5 = (document.getElementById("q1-covid19-caugh-05").checked) ? true : false;
            this.q6 = (document.getElementById("q1-covid19-breastache-06").checked) ? true : false;
            this.q7 = (document.getElementById("q1-covid19-lossoftaste-07").checked) ? true : false;

            //textarea
            this.q8 =  document.getElementById("q1-covid19-symptoms-other-08").value;

            this.q9 = (document.getElementById("q1-covid19-breathingproblems-09").checked) ? true : false;
            this.q10 = (document.getElementById("q1-covid19-halsschmerzen-10").checked) ? true : false;
            this.q11 = (document.getElementById("q1-covid19-musclepain-11").checked) ? true : false;
            //END SYMPTOMS

            //START BASE DISEASE
            this.q12 = (document.getElementById("q1-diabetes-01").checked) ? true : false;
            this.q13 = (document.getElementById("q1-chronical-kidney-02").checked) ? true : false;
            this.q14 = (document.getElementById("q1-chronical-respiratory-disease-03").checked) ? true : false;
            this.q15 = (document.getElementById("q1-smoker-04").checked) ? true : false;
            this.q16 = (document.getElementById("q1-cardiovascular-disease-05").checked) ? true : false;
            this.q17 = (document.getElementById("q1-high-bloodpessure-06").checked) ? true : false;
            this.q18 = (document.getElementById("q1-overweight-07").checked) ? true : false;
            this.q19 =  (document.getElementById("q1-pregnant-08").checked) ? true : false;
            this.q20 = (document.getElementById("q1-covid19-immunosuppression-09").checked) ? true : false;
            this.q21 = (document.getElementById("q1-cancer-10").checked) ? true : false;
            this.q22 = (document.getElementById("q1-none-11").checked) ? true : false;
            //textarea q23
            this.q23 =  document.getElementById("q1-other-disease-12").value;
            //END BASE DISEASE


            var questionRespJSON = require('./jsons/questionaireResponse02.json');

            questionRespJSON.questionnaire =  "http://localhost:8080/fhir/Questionnaire/"+QUESTIONNAIRE_ID+"/_history/1?_pretty=true";
            
            //Additional no symptoms & start date symptoms
            questionRespJSON.item[23].answer[0] = [{"valueBoolean":this.q001}];
            questionRespJSON.item[24].answer[0] = [{"valueDate":this.q002}];
            //@todo date store

            //START Symtoms
            questionRespJSON.item[0].answer[0] = [{"valueBoolean":this.q1}];
            questionRespJSON.item[1].answer[0] = [{"valueBoolean":this.q2}];
            questionRespJSON.item[2].answer[0] = [{"valueBoolean":this.q3}];
            questionRespJSON.item[3].answer[0] = [{"valueBoolean":this.q4}];
            questionRespJSON.item[4].answer[0] = [{"valueBoolean":this.q5}];
            questionRespJSON.item[5].answer[0] = [{"valueBoolean":this.q6}];
            questionRespJSON.item[6].answer[0] = [{"valueBoolean":this.q7}];
            //textfield item 7th
            questionRespJSON.item[7].answer[0] = [{"valueString":this.q8}];
            questionRespJSON.item[8].answer[0] = [{"valueBoolean":this.q9}];
            questionRespJSON.item[9].answer[0] = [{"valueBoolean":this.q10}];
            questionRespJSON.item[10].answer[0] = [{"valueBoolean":this.q11}];
            //END Symptoms

            //START Diseases
            questionRespJSON.item[11].answer[0] = [{"valueBoolean":this.q12}];
            questionRespJSON.item[12].answer[0] = [{"valueBoolean":this.q13}];
            questionRespJSON.item[13].answer[0] = [{"valueBoolean":this.q14}];
            questionRespJSON.item[14].answer[0] = [{"valueBoolean":this.q15}];
            questionRespJSON.item[15].answer[0] = [{"valueBoolean":this.q16}];
            questionRespJSON.item[16].answer[0] = [{"valueBoolean":this.q17}];
            questionRespJSON.item[17].answer[0] = [{"valueBoolean":this.q18}];
            questionRespJSON.item[18].answer[0] = [{"valueBoolean":this.q19}];
            questionRespJSON.item[19].answer[0] = [{"valueBoolean":this.q20}];
            questionRespJSON.item[20].answer[0] = [{"valueBoolean":this.q21}];
            questionRespJSON.item[21].answer[0] = [{"valueBoolean":this.q22}];
             //textfield item 12th
            questionRespJSON.item[22].answer[0] = [{"valueString":this.q23}];
            //END Diseases
            
            questionRespJSON.subject.reference =  "Patient/" + this.getPatientId();
            questionRespJSON.questionnaire =  "Questionnaire/" + localStorage.getItem("QuestionnaireRuleID");
            const event = new Date();
            questionRespJSON.authored =  event.toISOString();
            
            let resultBoolList = this.createBoolTrueList(algo_config, questionRespJSON);
            let checkByRule = false;
            let maxCheck = false; 
            let listIsEmpty = false;
            let _self = this;
            if(resultBoolList.length === 0) {
                listIsEmpty = true;
            } else {
                checkByRule = this.checkSymptoms(algo_config, resultBoolList);
                maxCheck = this.checkMaxAmountSymptoms(algo_config, resultBoolList);
            }

            let emailaddr = document.getElementById("email-address").value;
            let email_is_valid = _self.validateEmail(emailaddr);
            if(!email_is_valid || emailaddr === "") {
                this.setState({"helperText":"Bitte gültige E-Mail eingeben!"});
                this.setState({"error": true});
                alert("Bitte gültige E-Email eingegeben");
                return;
            }
            if(!listIsEmpty  && (maxCheck || checkByRule)) {
                fetch(BASE_URL_MAILER+"sendmail?email=" + emailaddr, {
                    method: 'GET'
                })
                .then(response => {
                    alert('Warn-E-Mail wurde abgesendet!');
                    _self.resetLocalStorage()
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("Senden der Warn-E-mail fehlgeschlagen! Error: " + error);
                });
            } else {
                fetch(BASE_URL_Q, {
                    method: 'POST', // or 'PUT'
                    headers: {
                    'Content-Type': 'application/fhir+json;charset=utf-8',
                    },
                    body: JSON.stringify(questionRespJSON),
                })
                .then(response => response.json())
                .then(data => {
                    console.log("Success, the generated id is: " + data.id);
                    let qid = data.id;
                    let pid = localStorage.getItem("patientPID");
                    document.getElementById("successAlertBottom").style.visibility  ="visible";
                    document.querySelector("#successAlertBottom .MuiAlert-message").innerHTML = '<div id="">Rule: ' + localStorage.getItem("QuestionnaireRuleID") + ' mit Person mit pid=' + pid + ' und '+
                    ' Fragebogen mit qid=' + qid + ' wurde erfolgreich gespeichert!';
                    _self.resetLocalStorage();
                })
                .catch((error) => {
                    console.error('Error:', error);
                    alert("Senden des Fragebogens fehlgeschlagen! Error: " + error);
                });
            }
    }
    validateEmail = (emailaddr) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailaddr).toLowerCase());
    }
    resetLocalStorage = () => {
        localStorage.removeItem("patient");
        localStorage.removeItem("patients");
        localStorage.removeItem("patientPID");
        localStorage.removeItem("patientQID");
        setTimeout(function(){
            document.getElementById("redirect-to-start-btn").click();
        },5000);

    }
    createBoolTrueList = (config, questionRespJSON) => {
        let items = questionRespJSON.item;
        let resultList = [];
        items.forEach(function(item) {
            let isInArray = config.exclude_symptoms.indexOf(parseInt(item.linkId));
            if( isInArray === -1 && (item.answer[0][0].valueBoolean === true)) {
                resultList.push(item.linkId);
            } else if (isInArray > -1) {
                console.warn("Symptom auf Ignorierliste");
            }
        }); 
        return resultList;
    }

    checkMaxAmountSymptoms = (config, resultBoolList) => {
        return resultBoolList.length >= config.max_checked_symptoms;//Regel verletzt dann ist check = true = warned
    }

    showAlert = () => {
        let alertText = "Covid Warnumg, Bitte lassen Sie sich testen!";
        alert(alertText);
        console.error(alertText);
    }

    checkSymptoms = (config, resultBoolList) => {
        let warned = false;
        const RULES_WARNING = config.rules_warning;
        let counter = [];
        for(let m = 0; m < RULES_WARNING.length; m++) {
            let rule = RULES_WARNING[m];
            for(let n = 0; n < rule.length; n++) {
                for(let itemsCount=0; itemsCount < resultBoolList.length; itemsCount++) {
                    let item = resultBoolList[itemsCount];
                    if(JSON.parse(item) === rule[n]) {
                        counter.push(item);
                    }
                    if(counter.length === rule.length) {
                        this.showAlert();
                        warned = true;//Regel verletzt dann ist check = true = warned
                        break;
                    }
                }
            }
            counter = [];
        }
        return warned;
    }

    getPatientId = () => {
        return localStorage.getItem("patientPID");
    }
    
    render() {
        const visibilitAlert = {'visibility' :'hidden'};
        return (
          <fieldset>
              <GotoStartRedirect/>
          <legend>Covid-19 Fragebogen #{this.qid} - Patient mit PID: {this.pid}</legend>
        <ul>
            <li>
                 <TextField id="email-address" 
                 helperText={this.state.helperText} 
                 error={this.state.error}
                 label="E-Mail-Adresse"
                 />
            </li>
          <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-no-symptoms"
                checked={this.state.checked_covid19_001}
                onChange={this.handleChange}
                name="checked_covid19_001"
                color="primary"
            />
            }
            label="Keine Symptome"
            />
            </li>
            <li>
                <StartDayDatePicker/>
            </li>
            <li><h4>Symptome:</h4></li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-fever-01"
                checked={this.state.checked_covid19_01}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_02}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_03}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_04}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_05}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_06}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_07}
                onChange={this.handleChange}
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
          value={this.state.textArea_covid19_08}
          onChange={this.handleChangeTextField}
          variant="outlined"
          label="Andere Symptome: (Symptom1, Symptom2, etc)?"
        />
            </li>
            <li>
            <FormControlLabel
            control={
            <Checkbox
                id="q1-covid19-breathingproblems-09"
                checked={this.state.checked_covid19_09}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_10}
                onChange={this.handleChange}
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
                checked={this.state.checked_covid19_11}
                onChange={this.handleChange}
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
                checked={this.state.checked_diabetes_01}
                onChange={this.handleChange}
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
                checked={this.state.checked_chronical_kidney_02}
                onChange={this.handleChange}
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
                checked={this.state.checked_chronical_respiratory_disease_03}
                onChange={this.handleChange}
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
                checked={this.state.checked_smoker_04}
                onChange={this.handleChange}
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
                checked={this.state.checked_cardiovascular_disease_05}
                onChange={this.handleChange}
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
                checked={this.state.checked_high_bloodpressure_06}
                onChange={this.handleChange}
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
                checked={this.state.checked_overweight_07}
                onChange={this.handleChange}
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
                checked={this.state.checked_pregnant_08}
                onChange={this.handleChange}
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
                checked={this.state.checked_immunosuppression_09}
                onChange={this.handleChange}
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
                checked={this.state.checked_cancer_10}
                onChange={this.handleChange}
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
                checked={this.state.checked_none_11}
                onChange={this.handleChange}
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
            value={this.state.textArea_disease_other_12}
            onChange={this.handleChangeTextFieldBaseDisease}
            variant="outlined"
            label="Andere: (Krankheit1, Krankheit2, etc)?"
            />
            </li>
            <li>
                <Alert id="successAlertBottom" style={visibilitAlert} severity="success"></Alert>
            </li>
            <li>
                <Button  onClick={this.sendFormQ1} variant="contained" color="primary" id="questionaire-q1" label="Absenden">Fragebogen absenden</Button>
            </li>
        </ul>
        </fieldset>
     );
    }
}

let GotoStartRedirect = () => {
    const hiddenElement = {'display':'none'};
    const navigate = useNavigate();
  
    let handleClick = () => {
      navigate("/some-page"); 
    }
  
    return (
      <button id="redirect-to-start-btn" style={hiddenElement} type="button" onClick={handleClick}>
        Go to start
      </button>
    );
  }
export default Questionnaire;