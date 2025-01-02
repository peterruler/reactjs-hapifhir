import React from 'react';
import TextField from '@mui/material/TextField';

class BirthdayDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: ""
   }
  }
  
  componentDidMount() {
    /* set start display date
    let dateObj = new Date();
    let month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    let day = ('0' + dateObj.getDate()).slice(-2);
    let year = dateObj.getFullYear();
    let newdate = year + "-" + month + "-" + day;
    this.setState({ "selectedDate": newdate })
    */
    this.setState({ "selectedDate": "" })
  }
  
  handleDateChange = (date) => {
      this.setState({ "selectedDate":date.target.value })
  }

  render() { 
    const classes = this.props;
    return (
      <form className={classes.container} noValidate>
        <TextField
          name="birthdate"
          id="birthdate"
          label="Geburtstag"
          type="date"
          value={this.state.selectedDate}
          className={classes.textField}
          onChange={(date) => this.handleDateChange(date)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

export default BirthdayDatePicker;