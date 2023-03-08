package com.plannerpal.plannerpal;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.concurrent.ExecutionException;

//import org.json.JSONArray;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class TaskService {

	public static final int COMPLETE = 0;
	public static final int INCOMPLETE = 1;
	public static final int NA_COMPLETE = 2;
	public static final int TODO = 0;
	public static final int CALENDAR = 1;
	
	private UserService userService = new UserService();
	private CalendarService calendarService = new CalendarService();
	
	//service to create a task document in the database
	public String createTask(String userId, Task task, int taskType) {
		
		try {
			//connect to firebase and use the deserialization to store the given Task object in the database
			Firestore dbFirestore = FirestoreClient.getFirestore();
			ApiFuture<DocumentReference> docRef = dbFirestore.collection("tasks").add(task);
			String taskId = docRef.get().getId();
			task.setDocumentId(taskId);
			updateTask(task);

			if (taskType == TODO) {
				//add this task to the user's to do list
				User user = userService.getUser(userId);
				user.addToDo(taskId);
				userService.updateUser(user);
			} else if (taskType == CALENDAR) {
				//add this task to the given calendar id
				CalendarTask event = (CalendarTask) task;
				String calId = event.getCalendar();
				Calendar calendar = calendarService.getCalendar(calId);
				calendar.addEvent(taskId);
				calendarService.updateCalendar(calendar);
			}
			
			return "added task with id " + docRef.get().getId() + " for user " + userId;
		} catch (InterruptedException e) {
			System.out.println("InterruptedException: " + e.getMessage());
		} catch (ExecutionException e) {
			System.out.println("Execution Exception: " + e.getMessage());
		} 
		return "";
	}
	
	//service to retrieve a task from the database
	//taskId (aka documentId) is returned along with Task object to the user, for future update/delete API calls 
	//	(taskId should be sent along with body for update, and sent as parameter for delete)
	public Task getTask(String taskId, int taskType) {
		
		try {
			//connect to firebase and retrieve the document with the given userId
			Firestore dbFirestore = FirestoreClient.getFirestore();
			DocumentReference documentReference = dbFirestore.collection("tasks").document(taskId);
			ApiFuture<DocumentSnapshot> future = documentReference.get();
			DocumentSnapshot document;
			document = future.get();
			
			//create a new user object, and serialize the document information into the object
			Task finalTask = null;
			if (document.exists()) {
				//crud = document.toObject(Task.class);
				if (taskType == TODO) {
					finalTask = new TodoTask();
					finalTask = document.toObject(TodoTask.class);
				} else if (taskType == CALENDAR){ //task is a calendar event
					finalTask = new CalendarTask();
					finalTask = document.toObject(CalendarTask.class);
				}
				return finalTask;
			} else {
				return null;
			}
		} catch (InterruptedException e) {
			System.out.println("InterruptedException: " + e.getMessage());
		} catch (ExecutionException e) {
			System.out.println("ExecutionException: " + e.getMessage());
		}
		return null;
	}
	
	//service to update the given user's document
	public String updateTask(Task task) {
		
		try {
			//connect to firebase and use the deserialization to store the User object in the database
			Firestore dbFirestore = FirestoreClient.getFirestore();
			ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("tasks").document(task.getDocumentId()).set(task);	
			return collectionsApiFuture.get().getUpdateTime().toString();
		} catch (InterruptedException e) {
			System.out.println("InterruptedException: " + e.getMessage());
		} catch (ExecutionException e) {
			System.out.println("Execution Exception: " + e.getMessage());
		} 
		return "";
	}
	
	//note that upon get, the taskId (aka documentId) is returned with body to the frontend - that id is needed for this API call
	//service to remove a user from the database (to be used for guest sessions)
	public String deleteTask(String userId, String taskId, int taskType) {
		Firestore dbFirestore = FirestoreClient.getFirestore();
		if (taskType == TODO) {
			//add this task to the user's to do list
			User user = userService.getUser(userId);
			user.removeTodo(taskId);
			userService.updateUser(user);
		} else if (taskType == CALENDAR) {
			//add this task to the given calendar id
			CalendarTask event = (CalendarTask) getTask(taskId, taskType);
			String calId = event.getCalendar();
			Calendar calendar = calendarService.getCalendar(calId);
			calendar.removeEvent(taskId);
			calendarService.updateCalendar(calendar);
		}
		
		ApiFuture<WriteResult> writeResult = dbFirestore.collection("task").document(taskId).delete();
		return "Successfully deleted " + taskId;
	}
	
	public String changeComplete(String taskId, boolean completed) {
		TodoTask task = (TodoTask) getTask(taskId, TODO); //Todo Task
		task.setCompleted(completed);
		updateTask(task);
		return "marked task " + taskId + " as complete = " + completed;
	}
	
	public List<TodoTask> getTodoList(String userId, int completeStatus) {
		User user = userService.getUser(userId);
		List<String> todos = user.getToDoList();
		List<TodoTask> result = new ArrayList<TodoTask>();
		
		for (String taskId : todos) {
			TodoTask task = (TodoTask) getTask(taskId, TODO); //Todo Task
			
			if ((completeStatus == COMPLETE) && task.isCompleted()) {
				result.add(task); 
			} else if ((completeStatus == INCOMPLETE) && !task.isCompleted()) {
				result.add(task); 
			} else if (completeStatus == NA_COMPLETE){ //NA_COMPLETE, ie no complete status given
				result.add(task); 
			}
		}
		
		return result;
	}
	
	public List<CalendarTask> sendAlerts(String userId) {
		List<CalendarTask> events = new ArrayList<CalendarTask>();
		User user = userService.getUser(userId);
		List<String> calendars = user.getCalendarList();
		
		for (String calId : calendars) {
			Calendar cal = calendarService.getCalendar(calId);
			List<String> eventIds = cal.getEventList();
			for (String eventId : eventIds) {
				CalendarTask event = (CalendarTask) getTask(eventId, CALENDAR);
				
				Date eventDate = new Date();
				SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.US);
				try {
					eventDate = formatter.parse(event.getStartTime());
				} catch (ParseException e) {
					System.out.println("parse exception: " + e.getMessage());
				}	
				Date rightNow = new Date();
				
				//https://www.geeksforgeeks.org/find-the-duration-of-difference-between-two-dates-in-java/#:~:text=Find%20the%20time%20difference%20between,the%20difference%20between%20two%20dates.
				long difference_In_Time = eventDate.getTime() - rightNow.getTime();
				if (difference_In_Time < 0) {
					continue;
				}
				
				long difference_In_Hours = (difference_In_Time / (1000 * 60 * 60)) % 24;
	            long difference_In_Years = (difference_In_Time / (1000l * 60 * 60 * 24 * 365));
	            long difference_In_Days = (difference_In_Time / (1000 * 60 * 60 * 24)) % 365;
	            
	            if (difference_In_Years > 0) {
	            	continue;
	            } else if (difference_In_Days > 0) {
	            	continue;
	            } else if (difference_In_Hours > 1) {
	            	continue;
	            } else {
	            	events.add(event);
	            }
			}
		}
		
		if (events.isEmpty()) {
			return null;
		}
		return events;
	}
}
