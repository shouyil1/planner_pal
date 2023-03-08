import { styled, alpha } from '@mui/material/styles';
import {Button, Menu, MenuItem, IconButton, Popover, Typography, TextField, Checkbox} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useEffect, useState } from "react";
import {AppBar, Box, Toolbar, Container, Tooltip, Grid} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MoreIcon from "@mui/icons-material"
import { auth, db, logout } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios"; 
import "./Events.css"

const ToDoForm = ({ addTask }) => {

    const [ userInput, setUserInput ] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(userInput);
        setUserInput("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input className="textarea" value={userInput} type="text" onChange={handleChange} placeholder="Enter a new task..."/>
            <br /><br />
            <button className="button">Add Task</button>
        </form>
    );
};

// axios({
//     method: 'get',
//     url: 'http://35.184.237.74:8080/getCal?calId=calendar1',
//     });

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function ToDoMenu( {todo, editTask, deleteTask} ) {
  // Edit & Delete Menu
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };

  const handleDelete = () => {
    deleteTask(todo.id)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  };

  // Edit Pop-up
  const [anchorElpu, setAnchorElpu] = React.useState(null)
  const openPU = Boolean(anchorElpu)
  const idPU = openPU ? 'simple-popover' : undefined;

  const handleEdit = (userInput) => {
    editTask(todo.id, userInput)
    setAnchorEl(null)
    setAnchorElpu(null)
  }

  const handleClickPU = (event) => {
    setAnchorElpu(event.currentTarget)
  }

  const handleClosePU = () => {
    setAnchorElpu(null)
  };



  return (
    <span>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClickPU} disableRipple>
          <EditIcon />
          Edit
          <Popover
            id={idPU}
            open={openPU}
            anchorEl={anchorElpu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>
              <TextField 
                id="standard-basic" 
                label="Edit Task" 
                defaultValue={todo.task} 
                onKeyDown={event => {
                  if (event.key === 'Enter') handleEdit(event.target.value)
                }}
                onClose={handleClosePU}
                variant="standard" />
            </Typography>
          </Popover>
        </MenuItem>
        <MenuItem onClick={handleDelete} disableRipple>
          <DeleteIcon />
          Delete
        </MenuItem>
      </StyledMenu>
    </span>
  );
}


const dataArr = [{
    "id": 1,
    "task": "Nothing to do!",
    "complete": false
  },]


function ToDoApp(props) {
  const [user, loading] = useAuthState(auth); 
  const [toDoList, setToDoList] = useState(dataArr);

  const getList = async () => {
      if(user) {
    const res = axios({
    method: 'get',
    url: `http://35.184.237.74:8080/getTodoList?userId=Han`,
    });
    console.log(res.data);
    console.log(res); 
    setToDoList(res.data)
   }
   }

    const [data, setData] = useState(null);
    
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


  // getList(); 
  
  const addTask = (userInput) => {
    if(user) {
      axios({
      method: 'post',
      url: `http://35.184.237.74:8080/createTodoTask?userId=Han`,
      data: {
        "taskName": userInput,
        "description": "-",
        "taskType": "TODO",
        "completed": false,
      }
      });
    }


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

   const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className="App">
      <AppBar position="static" sx={{ bgcolor: "#64bbeb" }}>
          <Toolbar>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: "left"}}>Planner Pal</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", alignContent: "flex-end", }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenUserMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                <Button className="buttonFull" onClick={() => props.setPage('settings')}>
                  Settings
                </Button>
                </MenuItem>
                <MenuItem>
                <Button className="buttonFull" onClick={() => {logout; props.setPage('login')}}>
                  Logout
                </Button>
                </MenuItem>
                <MenuItem>
                <Button className="buttonFull" onClick={handleCloseUserMenu}>
                  Cancel
                </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
      </AppBar>
      <div>
        {toDoList.map((todo) => {
          return (
            <div
              key={todo.documentId + todo.task}
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
              <span className={todo.complete ? "todoStrike" : "todo"}>
                {todo.task}
              </span>
              <ToDoMenu
                todo={todo}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            </div>
          );
        })}
      </div>
      <br />
      <ToDoForm addTask={addTask} />
      <br />
      <button className="button" onClick={() => {props.setPage('calendar')}}>Back</button>
    </div>
  );
}
 
export default ToDoApp;
