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
import './Events.css';
import { useEffect, useState } from "react";
import {AppBar, Toolbar, IconButton, Menu, Container, Tooltip, Button, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material"
import { auth, db, logout } from "./firebase";

// May need to follow instructions from this link
// https://stackoverflow.com/questions/48859169/error-types-can-only-be-used-in-a-ts-file-visual-studio-code-using-ts-che

function Settings(props)
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
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <div className='App'>
      <AppBar position="static" sx={{ bgcolor: "#64bbeb" }}>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: "left"}}>Settings</Typography>
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
                <Button className="buttonFull" onClick={() => props.setPage('calendar')}>
                  Home
                </Button>
                </MenuItem>
                <MenuItem>
                <Button className="buttonFull" onClick={() => {logout; props.setPage('login')}}>
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
              <MenuItem value={0}>At Time of Event</MenuItem>
              <MenuItem value={5}>Five Minutes Before</MenuItem>
              <MenuItem value={10}>Ten Minutes Before</MenuItem>
              <MenuItem value={20}>Twenty Minutes Before</MenuItem>
              <MenuItem value={30}>Thirty Minutes Before</MenuItem>
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