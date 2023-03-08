import "./Events.css";
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import logo1 from './assets/logo1.png'
import axios from 'axios';

//to get the date to look like that need to 
//https://www.geeksforgeeks.org/how-to-create-date-picker-in-reactjs/

// const loadGCal = async () => {
//     const events = await gapi.client.calendar.events.list({
//       calendarId: 'primary',
//       timeMin: new Date().toISOString(),
//       showDeleted: false,
//       singleEvents: true,
//     //   maxResults: 10,
//       orderBy: 'startTime'
//     });

//     console.log(events);
//     this.calendarItems = events.result.items;

//     const result = axios({
//                     method: 'put',
//                     url: 'http://35.184.237.74:8080/updateCalTask',
//                     data: {
//                         "calendar": calId,
//                         "startTime": startTime,
//                         "endTime": endTime,
//                         "taskName": taskName,
//                         "description": description,
//                         "taskType": "CALENDAR"
//                     }
//                   });
//     console.log(result);
       
// }


function Event(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [description, setDescription] = useState(''); 
    const [taskName, setTaskName] = useState(''); 

    const addEvent  = (calId, startTime, endTime, taskName, description) => {
      axios({
        method: "put",
        url: "http://35.184.237.74:8080/updateCalTask",
        data: {
          calendar: calId,
          startTime: startTime,
          endTime: endTime,
          taskName: taskName,
          description: description,
          taskType: "CALENDAR",
        },
      });
    }; 

    
// const insertEventInGCal = async (startTime, endTime, calendarName, eventName, desc) => {
//     const insert = await gapi.client.calendar.events.insert({
//       calendarId: calendarName,
//       start: {
//         dateTime: startTime,
//         timeZone: 'America/Los_Angeles'
//       }, 
//       end: {
//         dateTime: startTime+1,
//         timeZone: 'America/Los_Angeles'
//       }, 
//       summary: eventName,
//       description: desc
//     })
//     insert(startTime, endTime, calendarName, eventName, desc); 
//     //await this.getCalendar();
//   }

    return (
      <div className="App">
        {/* title */}
        <header className="App-header">
          <p className="title"><b> Planner Pal! </b></p>
        </header>
        <br></br>
            {/* main body */}
            <TextField id="outlined-basic" sx={{width:250}} label="Event Name" variant="outlined" onChange={(e) => setTaskName(e.target.value)}/><br></br>
            <br></br>
            <TextField id="outlined-basic" sx={{width:250}} label="Event Description" variant="outlined" onChange={(e) => setDescription(e.target.value)}/><br></br>
            <br></br>
            <TextField id="date" sx={{width:250}} label="Date of Event" type="date" defaultValue="2017-05-24" InputLabelProps={{shrink: true, }}/><br></br>
            <br></br>
            <TextField id="DateTimePicker" sx={{width:250}} label="Time" type="time" defaultValue="12:00" InputLabelProps={{shrink: true, }}/><br></br>
            <br></br>
            <button className="button" style={{width:"250px"}}onClick={() => insertEventInGCal(startDate, startDate, "primary", taskName, description)}><b><img className="image" src={logo1} alt="Logo" /><br></br>Add New Event</b></button>
            <br></br>
            <button className="button">
              Back
            </button><br /><br />
      </div>
    );
}

export default Event;