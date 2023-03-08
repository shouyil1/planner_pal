import './Events.css';
import Andrea  from './assets/android.png';
import Tweety  from './assets/twitter.png';
import Applet  from './assets/apple.png';
import Snappy  from './assets/snapchat.png';
import React, { useEffect, useState } from "react";
import {AppBar, Box, Toolbar, IconButton, Menu, Container, MenuItem, Tooltip, Button, Grid, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material"
import { auth, db, logout } from "./firebase";





function PickPal(props)
{
  const [pal, setPal] = useState('None');

  const ClickPal = event => 
  {
    setPal(event.target.id);
  }

  function ClickNext()
  {
    alert('You have selected ' + pal);
  }
  
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
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <Grid item xs={0}>
          <img src={Andrea} id='Andrea' alt='' onClick={ClickPal} />
        </Grid>
        <Grid item xs={0}>
          <img src={Tweety} id='Tweety' alt='' onClick={ClickPal} />
        </Grid>
        <Grid item xs={0}>
          <img src={Applet} id='Applet' alt='' onClick={ClickPal} />
        </Grid>
        <Grid item xs={0}>
          <img src={Snappy} id='Snappy' alt='' onClick={ClickPal} />
        </Grid>
      </Grid>
      
      <h2> Currently Selected: {pal} </h2>

      <button className='button' onClick={ClickNext}>Pick Pal</button>

    </div>
  );
}

export default PickPal; 