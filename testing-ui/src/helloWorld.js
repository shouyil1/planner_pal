import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useAuthState } from "react-firebase-hooks/auth";

function HelloWorld() {

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Hello World!
          </p>
        </header>
      </div>
    );

}

export default HelloWorld; 