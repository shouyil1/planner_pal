import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Popup from './Popup';
import PickPal from './PickPal';
import Settings from './Settings';
import CalendarMain from './CalendarMain';
import Events from './Events';
import Congratulations from './Congratulations';
import ThreeDotsMenu from './ThreeDotsMenu';
import reportWebVitals from './reportWebVitals';
import ToDoApp from './ToDoApp'
import ViewEvents from './ViewEvents'
import ToDoForm from './ToDoForm';
import Login from './Login';
import Character from './Character';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Character />
    <Congratulations />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
