import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';

export default function SimpleSelect() {
  const patient = JSON.parse(localStorage.getItem("patient"));
  const [gender, setGender] = React.useState(patient?.gender || '');

  const handleChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, float: 'left' }}>
      <FormControl sx={{ m: 1, minWidth: 120 }} variant="outlined">
        <InputLabel id="patient-simple-select-label">Geschlecht</InputLabel>
        <Select
          labelId="patient-simple-select-label"
          id="patient-select"
          value={gender}
          onChange={handleChange}
          label="Geschlecht"
        >
          <MenuItem value="male">männlich</MenuItem>
          <MenuItem value="female">weiblich</MenuItem>
          <MenuItem value="other">weitere</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
