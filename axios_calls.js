//load all tasks in a user's todo list
axios({
    method: 'get',
    url: 'http://35.184.237.74:8080/getTodoList?userId=' + {user.name},
    });

//load all completed tasks
axios({
    method: 'get',
    url: 'http://35.184.237.74:8080/getTodoListComplete?userId=' + {user.name},
    });

//load all to-be completed tasks
axios({
    method: 'get',
    url: 'http://35.184.237.74:8080/getTodoListIncomplete?userId=' + {user.name},
    });

//update event
//  - inputs to function need to be calendarId, 
                                    // startTime, in format yyyy-MM-dd HH:mm:ss
                                    // endTime, in format yyyy-MM-dd HH:mm:ss
                                    // taskName,
                                    // description
axios({
    method: 'put',
    url: 'http://35.184.237.74:8080/updateCalTask',
    data: {
        "calendar": calId,
        "startTime": startTime,
        "endTime": endTime,
        "taskName": taskName,
        "description": description,
        "taskType": "CALENDAR"
    }
    });

//delete event - task ID needs to be stored after get in frontend, though not displayed
axios({
    method: 'put',
    url: 'http://35.184.237.74:8080/deleteCalTask?taskId=' + {event.id},
    });

//add event
//  - inputs to function need to be calendarId, 
                                    // startTime, in format yyyy-MM-dd HH:mm:ss
                                    // endTime, in format yyyy-MM-dd HH:mm:ss
                                    // taskName,
                                    // description
axios({
    method: 'post',
    url: 'http://35.184.237.74:8080/createCalTask',
    data: {
        "calendar": calendarId,
        "startTime": startTime,
        "endTime": endTime,
        "taskName": taskName,
        "description": description,
        "taskType": "CALENDAR"
    }
    });


