import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useAuthState } from "react-firebase-hooks/auth";

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import GoogleIcon from '@mui/icons-material/Google';
import WLink from '@mui/material/Link';
import logo1 from './logo1.png'; 
import './login.css';

export default function Login() {

  return (
    <div className="App">
        <header className="App-header">
          <p>
            Welcome to Planner Pal! 
          </p>
        </header>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="emusernameail"
                  label="Username"
                  name="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <Grid container>
                  <Grid item>
                    <WLink href="https://youtu.be/dQw4w9WgXcQ" variant="body2">
                      {"First time pal? Sign up here!"}
                    </WLink>
                  </Grid>
                </Grid><br />
                <button
                  // type="submit"
                  // fullWidth
                  // variant="contained"
                  // sx={{ mt: 3, mb: 2 }}
                  className="login-button"
                >
                  Sign In
                </button><br /><br />
                
                <hr />
                <p>or</p>
                <button
                  // type="submit"
                  // fullWidth
                  // variant="contained"
                  // sx={{ mt: 3, mb: 2 }}
                  // src={logo1}
                  // startIcon={<GoogleIcon />}
                  className="login-button"
                >
                  <GoogleIcon />
                </button><br /><br />
                <Button
                  type="submit"
                  fullWidth
                  variant="text"
                >
                  Log in as a Guest
                </Button>

              </Box>
            </Box>
          </Container>
    </div>

  );
}
