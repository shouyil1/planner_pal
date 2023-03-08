// import "./Events.css";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Typography, AppBar, Toolbar, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useEffect  } from "react";
import { Menu, Container, MenuItem, Tooltip} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";


function CalendarMain(props) {
  const [date, setDate] = useState(new Date());

  function Import() {
    alert('You clicked "Import Calendar"!');
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
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
      <br></br>
      <div className='calendar-container'>
        <Calendar onChange={setDate} onClickDay={() => props.setPage('viewEvents')} value={date} calendarType = {"US"} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
      <button className = "button" onClick={Import}>Import Calendar</button><br></br><br></br>
      <button className = "button" onClick={() => props.setPage('event')}>Add New Event</button><br></br><br></br>
      <button className = "button" onClick={handleClickOpen}>Share Calendar</button><br></br><br></br>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share Calendar</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the username of the pal you would like to share your calendar with.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Share</Button>
        </DialogActions>
      </Dialog>
      <button className = "button" onClick={() => props.setPage('todo')}>Go to To-Do List</button>

    </div>
  );
}

export default CalendarMain; 