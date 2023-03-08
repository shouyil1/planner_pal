import React, { useState } from 'react';
import data from "./data/todoData.json";
import Checkbox from "@mui/material/Checkbox";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ToDoMenu from './ToDoMenu';
import ToDoForm from "./ToDoForm";
import Container from '@mui/material/Container';
import "./todo.css"

function ToDoApp() {
  const [toDoList, setToDoList] = useState(data);

  const handleClick = (e) => {
    e.preventDefault();
    markComplete(e.target.id);
  };

  const markComplete = (id) => {
    // window.alert(Number(id));
    let mapped = toDoList.map((task) => {
      return task.id === Number(id)
        ? { ...task, complete: !task.complete }
        : { ...task };
    });
    setToDoList(mapped);
  };

  const addTask = (userInput) => {
    let copy = [...toDoList];
    copy = [
      ...copy,
      { id: toDoList.length + 1, task: userInput, complete: false }
    ];
    setToDoList(copy);
  };

  const editTask = (id, userInput) => {
    let copy = toDoList.map((task) => {
      return task.id === Number(id)
      ? { ...task, task: userInput }
      : { ...task };
    });
    setToDoList(copy);
  }

  const deleteTask = (id) => {
    let copy = toDoList.filter((task) => {
      return task.id !== Number(id)
    });
    setToDoList(copy);
  }

  return (
    <div className="App">
      <header className="App-header">
        <IconButton aria-label="back" size="large" style={{position: 'relative',top: 70,left: -125}}>
          <ArrowBackIcon />
        </IconButton>
        <p>To-Do List</p>
      </header>
      <div>
        {toDoList.map((todo) => {
          return (
            <div
              key={todo.id + todo.task}
              name="todo"
              value={todo.id}
              // onClick={handleClick}
            >
              <Checkbox
                id={todo.id}
                edge="start"
                onChange={handleClick} 
                checked={todo.complete}
              />
              <span className={todo.complete ? "todoStrike" : "todo"}>{todo.task}</span>
              <ToDoMenu todo={todo} editTask={editTask} deleteTask={deleteTask} />
            </div>
          );
        })}
      </div>
      <ToDoForm addTask={addTask} />
    </div>
  );
}
 
export default ToDoApp;
