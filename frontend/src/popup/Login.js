import { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle, signInWithPopup } from "./firebase";
import { Button, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useAuthState } from "react-firebase-hooks/auth";
import { CssBaseline, AppBar, Toolbar, Typography, Box, Container} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import "./Events.css";
import "./assets/logo1.png";

export default function Login(props) {
    return (
    <div className="App">
      <AppBar position="static" sx={{ bgcolor: "#64bbeb" }}>
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
            Welcome to Planner Pal!
          </Typography>
        </Toolbar>
      </AppBar>
            <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
                  <br />          <br />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="emailAddress"
            label="Email Address"
            name="email"
        />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Grid container>
            <Grid item>
              <Button onClick={() => {props.setPage('signUp')}}>First time pal? Sign up here!</Button>
            </Grid>
          </Grid>
          <br />
          <button
            className="button"
            onClick={() => {
              logInWithEmailAndPassword(email, password);
            }}
          >
            Sign In
          </button>
          <br />
          <p>or</p>
          <Button
            sx={{ bgcolor: "#64bbeb" }}
            variant="contained"
            onClick={signInWithGoogle}
            // onClick={signInWithPopup}
            class="button"
          >
            Login With Google
          </Button>
          <br />
          <Button type="submit" fullWidth variant="text" onClick={()=>{props.setPage('todo'); props.setGuest('true')}}>
            Log in as a Guest
          </Button>
        </Box>
      </Box>
      </Container>
    </div>
  );
}
