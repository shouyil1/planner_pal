import { useEffect, useState } from 'react';
import { auth, logInWithEmailAndPassword, signInWithGoogle, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios"; 
import "./Events.css";
import Login from "./Login";
import Event from "./Event";
import ViewEvents from "./ViewEvents";
import ToDoApp from "./ToDoApp";
import Settings from "./Settings";
import PickPal from './PickPal';
import SignUp from './SignUp';
import CalendarMain from './CalendarMain';

function Popup() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(['login', 'pickPal', 'signUp', 'settings', 'event', 'todo', 'viewEvents', 'calendar']);
  const [user, loading] = useAuthState(auth);
  const [guest, setGuest] = useState(['false', 'true']);

  if(user)
  {
    if(page == 'event' ) {return (<Event setPage = {setPage} />); }
    else if(page == 'settings' ) {return (<Settings setPage = {setPage} />); }
    else if(page == 'pickPal' ) {return (<PickPal setPage = {setPage} />); }
    else if(page == 'todo' ) {return (<ToDoApp setPage = {setPage} />); }
    else if(page == 'viewEvents') {  return (<ViewEvents setPage = {setPage} />); }
    else if(page == 'login') { logout; }
    else if(page == 'calendar') {return <CalendarMain setPage = {setPage} />}
    else { setPage('calendar'); }
  }
  else if(guest == 'true') 
  { 
    if (page == 'todo' ) { return (<ToDoApp setPage = {setPage} />); }
    else { return (<Login setPage = {setPage} setGuest = {setGuest}/>); }
  }
  else if(page == 'signUp') {return (<SignUp setPage = {setPage} />);}
  else { return <Login setPage = {setPage} setGuest = {setGuest}/> }

}

export default Popup; 