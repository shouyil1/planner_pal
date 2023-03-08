package com.plannerpal.plannerpal;

import java.text.ParseException;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
	public TaskService taskService;
//	public UserService userService;
	public GoogleCalendar googleCalendar;
	
	public TaskController(TaskService taskServ) {
		taskService = taskServ;
	}
	
	//ALL Todo APIs
	
	@PostMapping("/createTodoTask")
	public String createTodoTask(@RequestParam String userId, @RequestBody TodoTask task) {
		return taskService.createTask(userId, task, taskService.TODO);
	}

	@PostMapping("/syncGoogleCalendar")
	public void syncGoogleCalendar(@RequestParam String userId, @RequestBody String oauthToken, @RequestBody String googleAccount) {
		googleCalendar.syncGoogleCalendar(userId, oauthToken, googleAccount);
	}
	
	@GetMapping("/getTodoTask")
	public Task getTodoTask(@RequestParam String taskId) {
		return taskService.getTask(taskId, taskService.TODO);
	}
	
	@PutMapping("/updateTodoTask")
	public String updateTodoTask(@RequestBody TodoTask task) {
		return taskService.updateTask(task);
	}
	
	@PutMapping("/deleteTodoTask")
	public String deleteTodoTask(@RequestParam String userId, @RequestParam String taskId) {
		return taskService.deleteTask(userId, taskId, taskService.TODO);
	}
	
	//get all tasks in a person's toDoList
	@GetMapping("/getTodoList")
	public List<TodoTask> getTodoList(@RequestParam String userId) {
		return taskService.getTodoList(userId, taskService.NA_COMPLETE);
	}
	
	//get completed
	@GetMapping("/getTodoListComplete")
	public List<TodoTask> getTodoListComplete(@RequestParam String userId) {
		return taskService.getTodoList(userId, taskService.COMPLETE);
	}
	
	//get incompleted
	@GetMapping("/getTodoListIncomplete")
	public List<TodoTask> getTodoLisIncomplete(@RequestParam String userId) {
		return taskService.getTodoList(userId, taskService.INCOMPLETE);
	}
	//public String getTodoListIncomplete
	
	//mark completed
	@PutMapping("/markComplete")
	public String markComplete(@RequestParam String taskId) {
		return taskService.changeComplete(taskId, true);
	}
	
	//mark incomplete
	@PutMapping("/markIncomplete")
	public String markIncomplete(@RequestParam String taskId) {
		return taskService.changeComplete(taskId, false);
	}
	
	//All Calendar APIS
	
		@PostMapping("/createCalTask")
		public String createCalTask(@RequestBody CalendarTask task) {
			return taskService.createTask("", task, taskService.CALENDAR);
		}
		
		@GetMapping("/getCalTask")
		public Task getCalTask(@RequestParam String taskId) {
			return taskService.getTask(taskId, taskService.CALENDAR);
		}
		
		@PutMapping("/updateCalTask")
		public String updateCalTask(@RequestBody CalendarTask task) {
			return taskService.updateTask(task);
		}
		
		@PutMapping("/deleteCalTask")
		public String deleteCalTask(@RequestParam String taskId) {
			return taskService.deleteTask("", taskId, taskService.CALENDAR);
		}
		
		@GetMapping("/getAlerts")
		public List<CalendarTask> sendAlerts(@RequestParam String userId) {
			return taskService.sendAlerts(userId);
		}
	
}
