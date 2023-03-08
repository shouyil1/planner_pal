import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import {Typography, AppBar, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import MoreIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from "react";
import { Menu, Container, MenuItem, Tooltip} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import "./Events.css"

//to add events from the backend, just parse the json with events, and append to the array "steps", with each event value assigned to their respective array keys (ie: label, description...)
//maxSteps should automatically adjust

const arr = [
  {
    label: 'Haley\'s Birthday!',
    description: 'Meet at Golf n Stuff ',
    date: 'December 2nd',
    time: '3pm'
  },
  {
    label: 'Meeting with Louis',
    description: 'Bring your resume!',
    date: 'December 5th',
    time: '12pm'
  },
  {
    label: 'Club Dinner',
    description: 'Spudnuts!',
    date: 'December 7th',
    time: '5pm'
  },
];



export default function ViewEvents(props) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = useState(arr);
  const maxSteps = steps.length; 
 

  const Delete = () =>  {
      const fewer = steps.splice(prevActiveStep, 1);
      setSteps(fewer);  
      setActiveStep((prevActiveStep)); 
  }

  // const Edit = () => {
  //   steps[0]
  // }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [user, loading] = useAuthState(auth);
  if(!user)
  {
    props.setPage('login'); 
  }

  return (
    <>
     <div className="App">
      <AppBar position="static" sx={{ bgcolor: "#64bbeb" }}>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: "left"}}>Planner Pal</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "flex-end", }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                <Button className="buttonFull" onClick={() => props.setPage('settings')}>
                  Settings
                </Button>
                </MenuItem>
                <MenuItem>
                <Button className="buttonFull" onClick={logout}>
                  Logout
                </Button>
                </MenuItem>
                <MenuItem>
                <Button className="buttonFull" onClick={handleCloseUserMenu}>
                  Cancel
                </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
      </AppBar>
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
          <Button className = "button" onClick={() => {props.setPage('event'); }}>Edit Event</Button>
          <br/><br/>
          <Button className = "button" onClick={() => Delete}>Delete Event</Button>
          {/* <p>{props.api().fact}</p> */}
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
    </>
  );
}
