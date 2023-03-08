import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import {CssBaseline, AppBar, Toolbar, Typography, Box, Container, MenuItem } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./Events.css";
import { IconButton, Menu, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material";
import p from './images/rest.png';
import g from './images/rest-green.png';
import o from './images/rest-orange.png';
import b from './images/rest-blue.png';

export default function SignUp(props) {
  const [pal, setPal] = useState("Android");

  const pals = [
    { id: 1, name: 'Purple', image: require('./images/rest.png'), color: '#d179e8' },
    { id: 2, name: 'Green', image: require('./images/rest-green.png'), color: '#85BAA1' },
    { id: 3, name: 'Orange', image: require('./images/rest-orange.png'), color: '#F39C6B' },
    { id: 4, name: 'Blue', image: require('./images/rest-blue.png'), color: '#64BBEB' },
   ]


  const ClickPal = (event) => {
    setPal(event.target.id);
  };

  return (
    <div className="App">
      <AppBar position="static" sx={{ bgcolor: "#64bbeb" }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
            Planner Pal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
            Sign Up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2} noValidate>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fullName"
                  fullWidth="false"
                  id="fullName"
                  label="Name"
                />
              </Grid>
            </Grid>
            <TextField
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />

            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={0}>
                <img
                  src={p}
                  id="Andrea"
                  alt=""
                  onClick={ClickPal}
                  width="50"
                  height="50"
                />
              </Grid>
              <Grid item xs={0}>
                <img
                  src={g}
                  id="Tweety"
                  alt=""
                  onClick={ClickPal}
                  width="50"
                  height="50"
                />
              </Grid>
              <Grid item xs={0}>
                <img
                  src={o}
                  id="Applet"
                  alt=""
                  onClick={ClickPal}
                  width="50"
                  height="50"
                />
              </Grid>
              <Grid item xs={0}>
                <img
                  src={b}
                  id="Snappy"
                  alt=""
                  onClick={ClickPal}
                  width="50"
                  height="50"
                />
              </Grid>
            </Grid>

            <p> You've Selected: {pal} </p>
            <Button class="button" sx={{ mt: 1 }}>
              Sign Up
            </Button>
            <br /> <br />
            <Button
              sx={{ bgcolor: "#64bbeb", mt: 1, mb: 1 }}
            variant="contained"
            onClick={signInWithGoogle}
              class="button"
            >
              Sign Up With Google
            </Button>
              <br /> <br />
          </Box>
        </Box>
      </Container>
    </div>
  );
}
