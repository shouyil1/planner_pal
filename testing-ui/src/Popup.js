import "./Popup.css";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useAuthState } from "react-firebase-hooks/auth";


// export const getCurrentTabUId = (callback) => {
//   const queryInfo = { active: true, currentWindow: true };

//   chrome.tabs &&
//     chrome.tabs.query(queryInfo, (tabs) => {
//       callback(tabs[0].id);
//     });
// };

function Popup() {
  // const sendMessage = () => {
  //   getCurrentTabUId((id) => {
  //     id &&
  //       chrome.tabs.sendMessage(id, {
  //         value: "openPopup",
  //       });
  //       console.log(id);
  //     window.close();
  //   });
  // };

    return (
      <div className="App">
        <header className="App-header">
          <p>
            Welcome to Planner Pal! 
          </p>
            <TextField id="input-with-sx" label="E-mail Address" variant="filled" size="small" onChange={(e) => setEmail(e.target.value)} />
            <TextField id="input-with-sx" label="Password" variant="filled" size="small" onChange={(e) => setPassword(e.target.value)} />
            <Button variant="contained" onClick={() => logInWithEmailAndPassword(email, password)}>Login</Button>
            <Button variant="contained">Go to home</Button>
            <Button variant="contained" onClick={signInWithGoogle}>Login With Google</Button>
              <Button variant="contained" onClick={sendMessage}>Sign Up With Google</Button>
            <Button variant="text" size="small"><a href="https://www.google.com/" target="_blank">google</a></Button>
            <Button variant="text" size="small"><Link style={{ textDecoration: 'none' }} to="/register"> Register Here</Link></Button>
        </header>
      </div>
    );
  // }

}

export default Popup; 