import React from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Create a theme
const theme = createTheme();

export default function DatePickers() {
  const patient = JSON.parse(localStorage.getItem("patient"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& .MuiTextField-root': {
            m: 1, // spacing using the theme multiplier
            width: 200,
          },
        }}
        noValidate
      >
        <TextField
          id="date"
          label="Geburtstag"
          type="date"
          defaultValue={patient?.birthDate || ''}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </ThemeProvider>
  );
}