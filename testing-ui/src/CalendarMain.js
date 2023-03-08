import "./CalendarMain.css";
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarMain() {

  //https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/

  // add "npm install react-calendar" to readme/deployment

  const [date, setDate] = useState(new Date());

  function Add() {
    alert('You clicked "Add New Event"!');
  }

  function Import() {
    alert('You clicked "Import Calendar"!');
  }

  function ClickDay() {
    alert('Redirect to ViewEvents.js!');
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          PlannerPal 
        </p>
      </header>
      <br></br>
      <div className='calendar-container'>
        <Calendar onChange={setDate} onClickDay={ClickDay} value={date} calendarType = {"US"} />
      </div>
      <p className='text-center'>
        <span className='bold'>Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
      <button className = "button" onClick={Add}>Add New Event</button><br></br><br></br>
      <button className = "button" onClick={Import}>Import Calendar</button>
    </div>
  );

}

export default CalendarMain; 