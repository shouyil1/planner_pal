import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

//to add events from the backend, just parse the json with events, and append to the array "steps", with each event value assigned to their respective array keys (ie: label, description...)
//maxSteps should automatically adjust

const steps = [
  {
    label: 'Event 1',
    description: '[Event1 Description]',
    date: '[Event1 Date]',
    time: '[Event1 Time]'
  },
  {
    label: 'Event 2',
    description: '[Event2 Description]',
    date: '[Event2 Date]',
    time: '[Event2 Time]'
  },
  {
    label: 'Event3 3',
    description: '[Event3 Description]',
    date: '[Event3 Date]',
    time: '[Event3 Time]'
  },
];

function Edit() {
  alert('Redirect to Events.js');
}

function Delete() {
  alert('Deleted Event!');
}

export default function TextMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length; 

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (

    <div className="App">
      <header className="App-header">
        <p>
          PlannerPal 
        </p>
      </header>
      <br></br>
    <Grid 
      container
      spacing={0}
      direction="row"
      alignItems="center"
      justifyContent="center">
      <Box sx={{ maxWidth: 400, flexGrow: 1, border: 1}}><br></br>
        <Paper
          square
          elevation={0}
          sx={{
            height: 30
          }}
        >
          <Typography sx={{color: 'black', fontWeight: 'bold'}}>{steps[activeStep].label}</Typography>
        </Paper>
        <Box sx={{ height: 240, maxWidth: 400, width: '100%'}}>
          {steps[activeStep].description}
          <br></br>
          {steps[activeStep].date}
          <br></br>
          {steps[activeStep].time}
          <br></br><br></br>
          <button className = "button" onClick={Edit}>Edit Event</button>
          <br/><br/>
          <button className = "button" onClick={Delete}>Delete Event</button>
        </Box>
        <MobileStepper
          variant="text"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button className = "nextButton"
              variant = "contained"
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{borderRadius: 2, bgcolor: '#64BBEB'}}>
            
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft sx={{ height: 20, maxWidth: 400, width: '30%'}}/>
                ) : (
                <KeyboardArrowRight sx={{ height: 20, maxWidth: 400, width: '30%'}}/>
                )}
            </Button>
          }
          backButton={
            <Button 
              variant = "contained"
              size="small"
              onClick={handleBack} 
              disabled={activeStep === 0}
              sx={{borderRadius: 2, bgcolor: '#64BBEB'}}>

              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight sx={{ height: 20, maxWidth: 400, width: '30%'}}/>
                ) : (
                <KeyboardArrowLeft sx={{ height: 20, maxWidth: 400, width: '30%'}}/>
                )}
              Back
            </Button>
          }
        />
      </Box>
    </Grid>
    </div>
  );
}
