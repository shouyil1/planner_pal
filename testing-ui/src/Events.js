import "./Events.css";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import logo1 from './logo1.png'
function eventAdded() {
    alert('New Event Successfully Added!');
}

//to get the date to look like that need to 
//https://www.geeksforgeeks.org/how-to-create-date-picker-in-reactjs/

function Event() {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <div className="App">
        {/* title */}
        <header className="App-header">
          <p className="title"><b> Planner Pal! </b></p>
        </header>
        <br></br>
            {/* main body */}
            <TextField id="outlined-basic" sx={{width:250}} label="Event Name" variant="outlined" /><br></br>
            <br></br>
            <TextField id="outlined-basic" sx={{width:250}} label="Event Description" variant="outlined" /><br></br>
            <br></br>
            <TextField id="date" sx={{width:250}} label="Date of Event" type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true, }}/><br></br>
            <br></br>
            <TextField id="DateTimePicker" sx={{width:250}} label="Time" type="time" defaultValue="12:00" InputLabelProps={{shrink: true, }}/><br></br>
            <br></br>
            <button className="button" style={{width:"250px"}}onClick={eventAdded}><b><img className="image" src={logo1} alt="Logo" /><br></br>Add New Event</b></button>
            <br></br>
      </div>
    );
}

export default Event;