import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import './Main.css';

// May need to follow instructions from this link
// https://stackoverflow.com/questions/48859169/error-types-can-only-be-used-in-a-ts-file-visual-studio-code-using-ts-che

function Settings()
{ 
  function ClickSave()
  {
    alert('Your changes have been saved.');
  }

  function ClickCancel()
  {
    alert('Your changes have not been saved.');
  }

  function ClickChangePal()
  {
    alert('Link to PickPal page');
  }

  const [alertsAlignment, alertsSetAlignment] = React.useState('alertsYes');

  const alertsHandleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    alertsSetAlignment(newAlignment);
  };

  const [movementAlignment, movementSetAlignment] = React.useState('movementYes');

  const movementHandleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    movementSetAlignment(newAlignment);
  };

  const [when, setWhen] = React.useState('10');

  const whenHandleChange = (
    event: SelectChangeEvent
  ) => {
    setWhen(event.target.value);
  };

  const [volume, setVolume] = React.useState('30');

  const volumeHandleChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    setVolume(newValue);
  };
  
  return (
    <div className='App'>
      <header className='App-header'>
        <p>
          Settings
        </p>
      </header>
 
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          justifyContent="center"
          width={600}
          rowSpacing={0.5}
          columnSpacing={0.5}
        >
          <Grid item xs={6}>
            <h3> Get Alerts for Events: </h3>
            <ToggleButtonGroup
              color="primary"
              value={alertsAlignment}
              exclusive
              onChange={alertsHandleChange}
              aria-label="Platform"
            >
              <ToggleButton value="alertsYes">Yes</ToggleButton>
              <ToggleButton value="alertsNo">No</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={6}>
            <h3> Select Pal: </h3>
            <button className='button' onClick={ClickChangePal}>Change</button>
          </Grid>

          <Grid item xs={6}>
            <h4> Set When Alerts Occur: </h4>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">When</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={when}
              label="When"
              onChange={whenHandleChange}
            >
              <MenuItem value={0}>Every Ten Minutes</MenuItem>
              <MenuItem value={5}>Every Thirty Minutes</MenuItem>
              <MenuItem value={10}>Every Hour</MenuItem>
              <MenuItem value={20}>Every Two Hours</MenuItem>
              <MenuItem value={30}>Every Three Hours</MenuItem>
            </Select>
          </FormControl>
          </Grid>

          <Grid item xs={6}>
            <h4> Toggle Pal Movement: </h4>
            <ToggleButtonGroup
              color="primary"
              value={movementAlignment}
              exclusive
              onChange={movementHandleChange}
              aria-label="Platform"
            >
              <ToggleButton value="movementYes">Yes</ToggleButton>
              <ToggleButton value="movementNo">No</ToggleButton>
            </ToggleButtonGroup>
          </Grid>

          <Grid item xs={10}>
            <h3> Volume: </h3>
            <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
              <Slider aria-label="Volume" value={volume} onChange={volumeHandleChange} />
            </Stack>
          </Grid>

          <Grid item xs={3}>
            <button className='buttonFull' onClick={ClickSave}>Save</button>
          </Grid>

          <Grid item xs={3}>
            <button className='buttonFull' onClick={ClickCancel}>Cancel</button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Settings; 