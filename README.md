# cs201_final_project

## 'frontend' folder: 
Contains all the frontend stuff, along with firebase. 


```bash
git clone git@github.com:daniel-bohen/cs201_final_project.git
cd cs201_final_project/frontend/
npm install
npm run build 
```

1. After the build has finished, go to chrome://extensions/. 
2. Turn on developer mode by toggling the switch in the top right.
3. Click on **Load unpacked**, and select `cs201_final_project/frontend/build/`
4. The extension has now been added to your browser successfully. 


## Making Changes
```bash 
npm run start
```

## Tutorial 
https://teacode.io/blog/how-to-build-chrome-extensions-with-react/

sample code for event slider: `sample_src_code/components/Unit.js`


# Final Tasks (remove from readme as completed)
Backend: 
- Write Pick Pal to Database: - updateUser
- read to do list - getAll 
- update event 
- delete event
- add event  
- Character popup 
- add/sync/display calendar 
-  fix the user to include multiple character options 

```javascript
    axios({
    method: 'post',
    url: 'http://35.184.237.74:8080/createTodoTask?userId=' + {user.name},
    data: {
      "taskName": userInput,
      "description": "-",
      "taskType": "TODO",
      "completed": false,
    }
    });
```

Frontend: 
-  Button for to do list
- Add back button to event.js 
- Make everything uniform 
- Add button to share user calendar 