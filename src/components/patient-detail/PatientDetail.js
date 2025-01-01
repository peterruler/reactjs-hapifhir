import React from 'react'
import 'date-fns';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MaterialUIPickers from './date-picker/DatePicker';
import Select from './select/SimpleSelect'
let choosePatient = () => {
  //console.info("Patient with pid=" + PID + " is chosen");
  document.getElementById("redirect-btn-q1").click();
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

class PatientDetail extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {patient:{}};
  }
  componentDidMount() {
    let patientObj = JSON.parse(localStorage.getItem("patient"));
    this.setState({ patient: patientObj })
  }
    render() {
      if(isEmpty(this.state.patient)) {
        return (<div>Patient ist leer!</div>);
      }
        return (
      <div> 
         <fieldset>
        <legend>Patient Prüfen</legend>
      <TextField
          id="pid"
          label="Patienten-ID"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
          margin="normal"
          value ={this.state.patient.id}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
         <TextField
          id="firstname"
          label="Vornamen"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
          margin="normal"
          value ={this.state.patient.name[0].given[0]}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <br/>
         <TextField
          id="lastname"
          label="Nachname"
          style={{ margin: 8 }}
          placeholder=""
          helperText=""
          margin="normal"
          value ={this.state.patient.name[0].family}
          InputLabelProps={{
            shrink: true,
          }}
        />   
        <br/>
        <MaterialUIPickers/>
        <Select/>
        </fieldset>
         <Button  onClick={choosePatient} style={{'marginTop': '15px'}} variant="contained" color="primary" id="choose-patient" label="Suchen">Patient wählen</Button>  
        </div>
        )
  }
}
export default PatientDetail;